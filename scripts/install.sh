#!/usr/bin/env bash
#
# One-command setup for Ithaca Design.
#
#   curl -fsSL https://raw.githubusercontent.com/binaniyash1/ithaca-design/main/scripts/install.sh | bash
#   bash scripts/install.sh
#
# Claude Code: marketplace + plugin + auto-update (when `claude` is present).
# Always: portable Agent Skills for Cursor / Codex / other hosts.
# Safe to re-run.

set -uo pipefail

REPO="binaniyash1/ithaca-design"
MARKET="ithaca"
PLUGIN="ithaca-design@ithaca"
KNOWN="$HOME/.claude/plugins/known_marketplaces.json"

SCRIPT_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi
ROOT=""
if [ -n "$SCRIPT_DIR" ] && [ -f "$SCRIPT_DIR/../.claude-plugin/marketplace.json" ]; then
  ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
elif [ -f "./.claude-plugin/marketplace.json" ]; then
  ROOT="$(pwd)"
fi

fail() { printf '\n✘ %s\n' "$1" >&2; exit 1; }

echo ""
echo "  Ithaca Design — install"
echo ""

install_skills() {
  if [ -n "$ROOT" ] && [ -f "$ROOT/scripts/install-skills.sh" ]; then
    bash "$ROOT/scripts/install-skills.sh" --from-root "$ROOT"
    return
  fi
  local tmp
  tmp="$(mktemp -d 2>/dev/null || mktemp -d -t ithaca-install)"
  if command -v git >/dev/null 2>&1; then
    if git clone --depth 1 "https://github.com/$REPO.git" "$tmp/repo" >/dev/null 2>&1 \
      || git clone --depth 1 "git@github.com:$REPO.git" "$tmp/repo" >/dev/null 2>&1; then
      bash "$tmp/repo/scripts/install-skills.sh" --from-root "$tmp/repo"
      rm -rf "$tmp"
      return
    fi
  fi
  echo "… skipped portable skills: could not locate the Ithaca repo tree"
  echo "  Clone $REPO and run: bash scripts/install-skills.sh"
  rm -rf "$tmp" 2>/dev/null || true
}

if ! command -v claude >/dev/null 2>&1; then
  echo "… Claude Code not on PATH — installing portable skills only."
  echo "  Install Claude Code later for the full marketplace path:"
  echo "  https://claude.com/claude-code"
  echo ""
  install_skills
  cat <<'EOF'

  Portable skills installed (or instructions printed above).
  Invoke: /ithaca-design
  or: Use the Ithaca Design skill. Build this PRD as production-ready product UI.

  Guide: https://ithaca-design.vercel.app
EOF
  exit 0
fi

if ! git ls-remote --exit-code "https://github.com/$REPO.git" HEAD >/dev/null 2>&1 \
  && ! git ls-remote --exit-code "git@github.com:$REPO.git" HEAD >/dev/null 2>&1; then
  fail "git can't reach $REPO.

  The marketplace is a git clone. You need access and authenticated git:
    gh auth login && gh auth setup-git

  Check with:
    git ls-remote https://github.com/$REPO.git HEAD"
fi

if python3 -c "
import json,os,sys
p=os.path.expanduser('$KNOWN')
sys.exit(0 if os.path.exists(p) and '$MARKET' in json.load(open(p)) else 1)
" 2>/dev/null; then
  echo "✔ marketplace '$MARKET' already added"
else
  echo "→ adding marketplace $REPO"
  claude plugin marketplace add "$REPO" >/dev/null 2>&1 \
    || fail "couldn't add the marketplace. Try:
    claude plugin marketplace add $REPO"
  echo "✔ marketplace added"
fi

if claude plugin list 2>/dev/null | grep -q "$PLUGIN"; then
  echo "✔ plugin already installed"
else
  echo "→ installing $PLUGIN"
  claude plugin install "$PLUGIN" >/dev/null 2>&1 \
    || fail "couldn't install the plugin. Try:
    claude plugin install $PLUGIN"
  echo "✔ plugin installed"
fi

python3 - <<PY
import json, os, sys
p = os.path.expanduser("$KNOWN")
if not os.path.exists(p):
    print("… skipped auto-update: no marketplace config yet"); sys.exit(0)
try:
    d = json.load(open(p))
except json.JSONDecodeError:
    print("… skipped auto-update: known_marketplaces.json isn't valid JSON"); sys.exit(0)
e = d.get("$MARKET")
if e is None:
    print("… skipped auto-update: marketplace missing"); sys.exit(0)
if e.get("autoUpdate") is True:
    print("✔ auto-update already on"); sys.exit(0)
e["autoUpdate"] = True
open(p, "w").write(json.dumps(d, indent=2) + "\n")
print("✔ auto-update on")
PY

echo ""
install_skills

cat <<'EOF'

  Restart Claude Code / Cursor / Codex — skills load at session start.

  Verify with:
      design me a settings page

  Expect the reply to open with:
      Using Ithaca Design v…

  Guide: https://ithaca-design.vercel.app
EOF
