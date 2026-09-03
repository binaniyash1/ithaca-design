#!/usr/bin/env bash
#
# SessionStart hook — notice when Ithaca has moved; turn on auto-update if skipped.
# Always exit 0. Never block. Say nothing when current.
#
# Test:
#   CLAUDE_PLUGIN_ROOT=plugins/ithaca-design \
#     ITHACA_VERSION_URL="file://$PWD/docs/version.json" \
#     ITHACA_FORCE_CHECK=1 bash plugins/ithaca-design/scripts/check-update.sh

VERSION_URL="${ITHACA_VERSION_URL:-https://ithaca-design.vercel.app/version.json}"
CACHE_DIR="$HOME/.claude/ithaca"
CACHE="$CACHE_DIR/update-check.json"
TTL=21600
KNOWN="$HOME/.claude/plugins/known_marketplaces.json"
MARKET="ithaca"

set -u

run_capped() {
  local secs="$1"; shift
  if command -v timeout >/dev/null 2>&1;  then timeout  "$secs" "$@"; return $?; fi
  if command -v gtimeout >/dev/null 2>&1; then gtimeout "$secs" "$@"; return $?; fi
  "$@" & local pid=$!
  ( sleep "$secs"; kill -9 "$pid" 2>/dev/null ) >/dev/null 2>&1 & local killer=$!
  wait "$pid" 2>/dev/null; local rc=$?
  kill -9 "$killer" 2>/dev/null; wait "$killer" 2>/dev/null
  return "$rc"
}

command -v python3 >/dev/null 2>&1 || exit 0

ROOT="${CLAUDE_PLUGIN_ROOT:-}"
[ -n "$ROOT" ] && [ -f "$ROOT/.claude-plugin/plugin.json" ] || exit 0
LOCAL_VERSION="$(python3 -c "
import json
try: print(json.load(open('$ROOT/.claude-plugin/plugin.json'))['version'])
except Exception: pass
" 2>/dev/null)"
[ -n "$LOCAL_VERSION" ] || exit 0

mkdir -p "$CACHE_DIR" 2>/dev/null || exit 0
PAYLOAD=""
if [ -z "${ITHACA_FORCE_CHECK:-}" ] && [ -f "$CACHE" ]; then
  PAYLOAD="$(python3 - "$CACHE" "$TTL" <<'PY' 2>/dev/null
import json, sys, time
try:
    d = json.load(open(sys.argv[1]))
except Exception:
    sys.exit(0)
if time.time() - float(d.get("checkedAt", 0)) < float(sys.argv[2]):
    print(json.dumps(d.get("payload") or {}))
PY
)"
fi

if [ -z "$PAYLOAD" ]; then
  if [[ "$VERSION_URL" == file://* ]]; then
    PATH_ONLY="${VERSION_URL#file://}"
    PAYLOAD="$(cat "$PATH_ONLY" 2>/dev/null || true)"
  else
    PAYLOAD="$(curl -fsS --max-time 3 "$VERSION_URL" 2>/dev/null || true)"
  fi

  if [ -z "$PAYLOAD" ] && [ -f "$KNOWN" ]; then
    CLONE="$(python3 -c "
import json
try: print(json.load(open('$KNOWN')).get('$MARKET',{}).get('installLocation',''))
except Exception: pass
" 2>/dev/null)"
    if [ -n "$CLONE" ] && [ -f "$CLONE/plugins/ithaca-design/.claude-plugin/plugin.json" ]; then
      PAYLOAD="$(python3 -c "
import json
p='$CLONE/plugins/ithaca-design/.claude-plugin/plugin.json'
try:
    v=json.load(open(p))['version']
    print(json.dumps({'version': v}))
except Exception: pass
" 2>/dev/null)"
    fi
  fi

  [ -n "$PAYLOAD" ] || exit 0
  python3 - "$CACHE" "$PAYLOAD" <<'PY' 2>/dev/null || true
import json, os, sys, time, tempfile
cache, payload = sys.argv[1], sys.argv[2]
try:
    body = json.loads(payload)
except Exception:
    sys.exit(0)
fd, tmp = tempfile.mkstemp(dir=os.path.dirname(cache))
with os.fdopen(fd, "w") as f:
    json.dump({"checkedAt": time.time(), "payload": body}, f)
os.replace(tmp, cache)
PY
fi

# Enable auto-update if off
python3 - <<PY 2>/dev/null || true
import json, os
p = os.path.expanduser("$KNOWN")
if not os.path.exists(p):
    raise SystemExit
try:
    d = json.load(open(p))
except Exception:
    raise SystemExit
e = d.get("$MARKET")
if not isinstance(e, dict):
    raise SystemExit
if e.get("autoUpdate") is True:
    raise SystemExit
e["autoUpdate"] = True
open(p, "w").write(json.dumps(d, indent=2) + "\n")
print("Ithaca: auto-update was off — it is on now so the next start can pick up updates.")
PY

# Compare versions (simple semver tuple)
python3 - "$LOCAL_VERSION" "$PAYLOAD" <<'PY' 2>/dev/null || exit 0
import json, sys

def parse(v):
    parts = []
    for p in str(v).strip().lstrip("v").split("."):
        try: parts.append(int(p))
        except Exception: parts.append(0)
    return tuple(parts + [0, 0, 0])[:3]

local = sys.argv[1]
try:
    remote = json.loads(sys.argv[2]).get("version")
except Exception:
    raise SystemExit
if not remote:
    raise SystemExit
if parse(remote) <= parse(local):
    raise SystemExit
print(
    f"Ithaca Design v{remote} is out — this session is on v{local}.\n"
    f"Run: claude plugin update ithaca-design@ithaca\n"
    f"Then restart Claude Code."
)
PY

exit 0
