# Ithaca Design

A portable Agent Skill and cross-agent plugin that turns product requirements into implemented,
rendered, and visually audited UI using Gushwork's design rules, component
selection logic, and quality gates.

**Install page:** https://ithaca-design.vercel.app

Planning documents: [masterplan.md](masterplan.md) (what and why),
[execution-plan.md](execution-plan.md) (do this, then check this).

## What this repo is

This repo contains one canonical portable skill plus the host adapters and
marketplaces that distribute it.

```
.claude-plugin/marketplace.json     the catalog — marketplace name "ithaca"
.agents/plugins/marketplace.json    Codex marketplace — same name and plugin
skills/ithaca-design/               canonical portable Agent Skill — edit here
plugins/ithaca-design/              the plugin itself
  .claude-plugin/plugin.json        Claude Code manifest
  .codex-plugin/plugin.json         Codex manifest for the same release
  skills/ithaca-design/             generated copy of the canonical skill
  skills/agent/SKILL.md             compatibility alias for the old command
docs/                               static install page, deployed by Vercel
retros/                             one retro per phase
```

The canonical definition of the design system is **text in this repo**. Figma is
a generated projection, never a peer authoring surface. A new component starts as
a spec commit, not a Figma component.

## Install

### Claude Code

```
/plugin marketplace add binaniyash1/ithaca-design
/plugin install ithaca-design@ithaca
```

Restart Claude Code afterwards, or the skill will not fire.

### Codex — repository development build

```bash
codex plugin marketplace add /absolute/path/to/ithaca-design
codex plugin add ithaca-design@ithaca
```

Start a new Codex task afterwards. Skills are discovered when the task starts;
an already-running task does not become a valid installation test.

### Portable Agent Skill

For an app that supports the open Agent Skills format, install or link the
repository path `skills/ithaca-design`. The portable skill is named
`ithaca-design`; its rule files travel with it and do not depend on the Claude
or Codex manifests.

The Claude plugin still accepts `/ithaca-design:agent` for compatibility. New
hosts should use the portable `ithaca-design` skill directly.

## Current vertical slice

Version 0.5 accepts a PRD, plans silently, implements the UI in the target
repository, runs a preview, visually audits the result, fixes failures, and
reports evidence. The first benchmark is `tests/sample-prds/crm-today.md`, a
dense operational CRM queue with ambient and selected-record context states.
Its first screenshot-feedback regression is captured in
`tests/feedback-regressions/crm-today-round-1.md`.
The second benchmark adds verified field-service rules for structured grouped
work, conditional table headers, metric-card construction, and
selection-triggered context.

## How releases work

**Merges to `main` are releases.** There is no separate publish step.

### Versioning

Each host requires its own manifest, but the design intelligence is authored
only in `skills/ithaca-design`. Run `npm run sync:skill` after changing the
canonical skill. It deterministically regenerates the plugin copy. Validation
and deployment fail if a host copy drifts.

The marketplace entry in `.claude-plugin/marketplace.json` deliberately carries
**no** `version` key. Claude Code resolves version in this priority order:

1. `plugin.json` version field
2. marketplace entry `version` field
3. git commit SHA
4. `unknown`

Because `plugin.json` always wins *silently*, the Claude marketplace entry must
not duplicate its version. The Codex manifest is a separate host contract and
must match through the release check.

### Cutting a release

1. Update the canonical skill and run `npm run sync:skill`.
2. Bump both host manifests to the same version.
3. Run `npm run build`; this checks synchronization, manifests, and docs.
4. Update the changelog on the install page and merge to `main`.

### Verifying an install

Run a UI implementation request in a new task and inspect the task's active
skills. The request must follow the PRD-to-rendered-UI workflow and report its
visual verification. An already-running task is not an install test.

## Governance

- Plugins are copied to a local cache in plain text. **No secrets in this repo.**
- Reference screens are inputs to *rules*, never sources for components. The
  pipeline is reference → extracted rule → own component.
- Auto-update must be enabled explicitly, or the catalog never refreshes and
  users sit on an old version indefinitely with no error.
