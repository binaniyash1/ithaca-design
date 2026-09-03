# Install Ithaca Design

**Live page:** https://ithaca-design.vercel.app

## One-liner

```bash
curl -fsSL https://raw.githubusercontent.com/binaniyash1/ithaca-design/main/scripts/install.sh | bash
```

From a clone: `bash scripts/install.sh`

Installs the Claude marketplace plugin when `claude` is present (and enables
auto-update), and always installs portable skills for Cursor / Codex.

## Restart

Quit and reopen the agent. Skills load at session start.

## Verify

```
design me a settings page
```

Expect the reply to open with `Using Ithaca Design v…`, then implement UI.

Cursor / Codex:

```
/ithaca-design
Build this PRD as production-ready product UI.
```

## Portable skills only

```bash
bash scripts/install-skills.sh
# or repo-scoped:
bash scripts/install-skills.sh --project
```

## Stay current (Claude)

```bash
claude plugin update ithaca-design@ithaca
```

Then restart. Session start also compares against
https://ithaca-design.vercel.app/version.json.
