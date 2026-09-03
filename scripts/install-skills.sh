#!/usr/bin/env bash
#
# Install the canonical Ithaca Agent Skill into common skill directories.
#
#   bash scripts/install-skills.sh
#   bash scripts/install-skills.sh --from-root /path/to/ithaca-design
#   bash scripts/install-skills.sh --project

set -uo pipefail

FROM_ROOT=""
PROJECT=0
while [ $# -gt 0 ]; do
  case "$1" in
    --from-root) FROM_ROOT="$2"; shift 2 ;;
    --project) PROJECT=1; shift ;;
    *) shift ;;
  esac
done

if [ -z "$FROM_ROOT" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  FROM_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
fi

SRC="$FROM_ROOT/skills/ithaca-design"
NAME="ithaca-design"

if [ ! -f "$SRC/SKILL.md" ]; then
  printf '\n✘ Skill not found at %s/SKILL.md\n' "$SRC" >&2
  exit 1
fi

install_one() {
  local dest="$1"
  mkdir -p "$(dirname "$dest")" 2>/dev/null || return 1
  rm -rf "$dest"
  mkdir -p "$dest"
  if command -v rsync >/dev/null 2>&1; then
    rsync -a --delete "$SRC/" "$dest/"
  else
    cp -R "$SRC/." "$dest/"
  fi
  echo "✔ $dest"
}

echo ""
echo "  Ithaca — portable skills"
echo ""

for t in \
  "$HOME/.cursor/skills/$NAME" \
  "$HOME/.codex/skills/$NAME" \
  "$HOME/.agents/skills/$NAME" \
  "$HOME/.claude/skills/$NAME"
do
  install_one "$t" || echo "… skipped $t"
done

if [ "$PROJECT" = 1 ]; then
  install_one "$(pwd)/.agents/skills/$NAME" || true
fi

cat <<EOF

  Invoke:
    /$NAME
  or: Use the Ithaca Design skill. Build this PRD as production-ready product UI.

  Reload the agent window if the skill does not appear immediately.
EOF
