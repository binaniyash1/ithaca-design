# Ithaca Design

A Claude Code plugin that encodes a design system — tokens, component contracts,
composition patterns, and design judgment — so that agentic tools generate
product screens using real system parts instead of inventing generic ones.

**Install page:** https://ithaca-design.vercel.app

Planning documents: [masterplan.md](masterplan.md) (what and why),
[execution-plan.md](execution-plan.md) (do this, then check this).

## What this repo is

This repo is **both** the marketplace and the plugin it distributes.

```
.claude-plugin/marketplace.json     the catalog — marketplace name "ithaca"
plugins/ithaca-design/              the plugin itself
  .claude-plugin/plugin.json        manifest — THE version lives here
  skills/agent/SKILL.md             agent surfaces skill
docs/                               static install page, deployed by Vercel
retros/                             one retro per phase
```

The canonical definition of the design system is **text in this repo**. Figma is
a generated projection, never a peer authoring surface. A new component starts as
a spec commit, not a Figma component.

## Install

```
/plugin marketplace add binaniyash1/ithaca-design
/plugin install ithaca-design@ithaca
```

Restart Claude Code afterwards, or the skill will not fire.

## How releases work

**Merges to `main` are releases.** There is no separate publish step.

### Versioning

The version is set in **exactly one place**: the `version` field of
[plugins/ithaca-design/.claude-plugin/plugin.json](plugins/ithaca-design/.claude-plugin/plugin.json).

The marketplace entry in `.claude-plugin/marketplace.json` deliberately carries
**no** `version` key. Claude Code resolves version in this priority order:

1. `plugin.json` version field
2. marketplace entry `version` field
3. git commit SHA
4. `unknown`

Because `plugin.json` always wins *silently*, setting it in both places means a
stale manifest can mask the marketplace value with no warning. One place only.

### Cutting a release

1. Bump `version` in `plugin.json`.
2. Update the version announcement line in every affected `SKILL.md` so it
   matches the manifest.
3. Update the changelog on the install page.
4. Merge to `main`.

The announcement line is rewritten by the release process, never by hand in
isolation — a skill announcing a version the manifest does not carry is exactly
the silent failure this design is meant to prevent.

### Verifying an install

Every skill response opens with a line naming the skill and its version. If that
line is absent, the plugin did not load. If it disagrees with the version on the
install page, the install is stale.

## Governance

- Plugins are copied to a local cache in plain text. **No secrets in this repo.**
- Reference screens are inputs to *rules*, never sources for components. The
  pipeline is reference → extracted rule → own component.
- Auto-update must be enabled explicitly, or the catalog never refreshes and
  users sit on an old version indefinitely with no error.
