# Where I left off

**Last updated:** 19 Aug 2026
**Read this first if you are picking the project up cold.**

---

## Current position

**Phase 1 — Seed screens.** Prep is complete; the screens themselves are being
drawn by hand in Figma. **Nothing agent-driven is in flight.**

| | |
|---|---|
| **Plugin version** | `0.1.0` — canary, installed, announces itself, generates nothing |
| **Live install page** | https://ithaca-design.vercel.app |
| **Figma file** | `wqs3OgPvp03s0R0wUTzUHj` (Gush Design, pro) |
| **Figma page** | `Atlas — scratch` — 27 component sets, 90 variants |

---

## Done

**Phase −1 — Prep.** Environment verified, private repo on an SSH remote, Figma
MCP working, Vercel live and rebuilding on push. Gate −1 passed.

**Phase 0 — Skeleton and trust loop. Gate 0 PASSED.** Marketplace, plugin
manifest, canary skill, install page generated from the manifest. All five
trigger tests behaved. See `retros/phase-0.md`.

**Phase 1 prep.**
- **P1.1** reference calibration → `spec/reference-rules.md`
- **P1.2** coverage audit and the S4 split → `spec/seed-screen-coverage.md`
- **P1.3** state checklist, 133 items → `spec/seed-screen-states.md`

**Atlas (a side track, not a phase).** Groups **I** and **D** built in Figma.
On hold — see `atlas-build-log.md`.

---

## Next

1. **Draw seed screens 1 and 2 in Figma** — this is what is in progress.
2. Work `spec/seed-screen-states.md` screen by screen. Gate 1 needs every state,
   not the happy path.
3. Answer the three **Open design questions** at the end of that file *while
   drawing* — they cannot be answered from outside.
4. Then **Gate 1**, then Phase 2 (spec extraction).

Resuming the atlas instead is also valid: next group is **E (49–55)**.

---

## Which files govern

**Read in this order.** Where two disagree, the one higher up wins.

| File | Authority |
|---|---|
| `execution-plan.md` | **Governs.** Locked decisions, thresholds, the five seed screens, every phase prompt, every gate |
| `masterplan.md` | Why. Architecture and intent. Does not override the execution plan |
| `spec/reference-rules.md` | Rules extracted from references — **R1, R2, R3** |
| `spec/tokens-v0.md` | **PROVISIONAL** tokens. P2.1 replaces it wholesale from the drawn screens |
| `spec/empty-states.md` | Contracts for atlas 64 / 65 / 66 |
| `spec/rules-pending.md` | Known rule gaps. **001, 002 resolved · 003, 004 open** |
| `spec/seed-screen-coverage.md` | Coverage maths and the S4 split decision |
| `spec/seed-screen-states.md` | The Phase 1 working checklist |
| `component-atlas.md` | Practice scaffold, **not the spec**. A component graduates by spec commit only |
| `atlas-build-log.md` | Atlas resume point and outstanding rebuilds |

---

## Carry these in your head

- **The canonical source is text in this repo.** Figma is a generated
  projection. A new component starts as a spec commit, never as a Figma
  component.
- **Version lives in exactly one place** —
  `plugins/ithaca-design/.claude-plugin/plugin.json`. The docs build **fails**
  if `SKILL.md` announces a different one. That guard is deliberate.
- **References teach rules, never components.** reference → extracted rule →
  own component.
- **R1 has independent support** (Peec and ClickUp, from opposite design
  opinions). R2 and R3 are single-source. Weight them accordingly.

---

## Open, needing a decision at some point

| What | Where | When |
|---|---|---|
| 44px row ceiling vs label wrapping | `rules-pending.md` 004 | Before atlas group F |
| "One button, no secondary" rests on two samples | `rules-pending.md` 003 | P2.3 |
| Two-region or three-region default for agent surfaces | `reference-rules.md` Part 3 | Phase 3 |
| `#33` Command palette deferral | `seed-screen-coverage.md` D4 | Phase 6 |
| Auto-update never genuinely tested | `retros/phase-0.md` | When the marketplace source moves to `binaniyash1/ithaca-design` |

**Two housekeeping items, neither blocking:** the Figma file is still named
`Document` rather than `Ithaca`, and there is a plaintext Figma token in
`~/.claude/settings.json` worth rotating.
