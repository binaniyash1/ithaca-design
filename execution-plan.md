# execution-plan.md

**Project:** Ithaca Design
**Companion to:** `masterplan.md`
**Revision 3** — 19 August 2026. Every prompt is pasteable as-is. Nothing left to fill.

---

## How to use this document

The masterplan says *what* and *why*. This says *do this, then check this*.

1. **Never skip a validation gate.** Each phase ends in a pass/fail test. A failed gate means fix, not proceed.
2. **Run one prompt at a time.** Verify the outcome before the next.
3. **Write the retro.** Three lines in `retros/` per phase. Without it, phase five repeats phase two's mistake.

Every prompt below is complete. Copy the block, paste into Claude Code, run.

---

## Part A — Locked decisions

### Naming

```
Project name:      Ithaca Design
Marketplace name:  ithaca
Plugin name:       ithaca-design
Skills:            agent, app, web
Repo:              ithaca-design
Docs URL:          ithaca-design.vercel.app
Install command:   plugin install ithaca-design@ithaca
```

Skills stay short because Claude Code namespaces them — they read as `ithaca-design:agent`.

*Ithaca is the destination in the Odyssey; every decision measured against whether it gets you home.*

### Environment

| What | Decision |
|---|---|
| GitHub repo | Private now, public when it works. **SSH remote required** — background auto-update can't authenticate over HTTPS on private repos |
| Figma team | **Gush Design** (pro). Variable modes needed for two density modes plus brand overrides; constrained on starter tiers |
| Figma file | `Ithaca`, key `wqs3OgPvp03s0R0wUTzUHj` |
| Docs hosting | Free `.vercel.app` subdomain. No purchase |
| **Theme** | **Light mode only for v1.** Colour ramps are still authored with dark values present but unused, so a future addition is a mode, not a re-extraction |
| Motion | In scope |
| Native mobile | Out of scope. Responsive web only |
| Second brand | Gushwork |
| Canonical source | **Text spec in the repo is truth. Figma is a generated projection.** Designers use Figma normally but cannot change the system there — a new component starts as a spec commit, not a Figma component |

### Thresholds

Refusal rules need numbers or they are decoration.

| Rule | Threshold |
|---|---|
| Font weights | Maximum 2 per screen |
| Accent colours | 1 decorative accent per screen, plus 4 semantic roles (success, warning, danger, info) usable only where they carry real status meaning |
| Row height | High density: maximum 44px per row, minimum 12 rows visible in a 900px viewport |
| Shadows | Never on a coloured background. Never at all in high-density mode |
| Corner radii | One radius scale per surface, no exceptions within a surface |
| Body text | Never centred |
| Icon-only buttons | Never without a visible label |
| Gradients | **Permitted** as atmosphere and surface in low-density mode. Explicit exception — do not over-correct |
| Bold chromatic colour | Permitted on marketing surfaces and empty states only, never app chrome |

### Reference set

| Reference | What is taken |
|---|---|
| Lindy | Surface language — warm gradient wash, soft-shadow elevation, pill chips, generous negative space, low element count |
| Peec AI | Structural language — hairline panels, no shadow, 12–13px type, tight rows, dense multi-panel dashboards, semantic tags |
| Manus | Agent surfaces — three-region layout, tool-call rows, reasoning trace, artifact and file lists, modal over chat |
| Linear | Detail-view discipline — property rail, activity feed, inline edit, restrained three-pane density |
| Whop | Commerce and marketing colour confidence — pricing card, promo banner, FAQ accordion, media block |
| Firecrawl, Amie, ClickUp | Held in reserve for later calibration passes |

**Rule for all references: reference → extracted rule → own component.** Never reference → component.

### The five seed screens

Each anchored to one reference screen, chosen so the five between them force the widest component surface into existence.

| # | Screen | Anchor | Forces into existence |
|---|---|---|---|
| 1 | Agent chat with work surface | [Manus](https://mobbin.com/screens/a6af52d3-15ee-4bb1-88e9-3059b9614c21) | Three-region shell, composer, message types, tool-call rows, reasoning trace, streaming state, artifact card, file list, modal layer with tab filters |
| 2 | Dense dashboard | [Peec AI](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Hairline panel grid, metric tiles, sparkline panel, ranked table, semantic tags, filter chip row |
| 3 | Data table with bulk actions | [Peec AI](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Table, sortable column headers, row selection, bulk-action toolbar, sidebar filter tree, pagination, search |
| 4 | Record detail and settings | [Linear](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | Property rail, property rows, inline edit, sub-item list, activity feed, comment composer, every input type, validation, destructive action |
| 5 | Commerce landing page | [Whop](https://mobbin.com/screens/c1d2d1d6-5a34-45f9-8359-71ed69d5037a) | Hero, section wrappers, pricing card, promo banner, media block, FAQ accordion, footer, CTA |

Two honest notes on this set.

**Screen 5's anchor is a product page rather than a pure marketing landing.** That's deliberate — it forces the pricing card, accordion and promo banner into existence, which a hero-and-CTA landing page would not.

**Forms are the thinnest coverage in this five.** Screen 4 has to absorb that load, so design it as a settings-style detail view with a real multi-field form, validation states, and a destructive confirm — not just Linear's property rail. If it doesn't, the form gap surfaces at Phase 5 instead.

**Nothing in this document is open.** Every prompt is complete.

---

## Part B — Phased execution

---

### Phase −1 — Prep (30 minutes)

**P−1.1 — Environment check**

```
Check my local environment for building a Claude Code plugin and report a simple
pass/fail on each:

1. Node.js — installed and version
2. GitHub CLI — installed and authenticated
3. Git — configured with name and email
4. SSH key present and loaded in ssh-agent
5. Claude Code version

For anything failing, tell me the fix. Install Node via nvm if it's missing —
don't touch a system Node. Show me each command before running it. Do not
install anything without asking first.
```

**P−1.2 — Repo**

```
Create a private GitHub repository named ithaca-design under my account and set
it up locally in this directory.

Requirements:
- Private
- SSH remote, not HTTPS — background plugin auto-updates can't authenticate over
  HTTPS on private repos
- A .gitignore appropriate for a Node and static-site project
- Initial commit, pushed

Confirm the remote is SSH by showing me the output afterwards.
```

**P−1.3 — Figma MCP**

```
Add the Figma MCP server to Claude Code for this project, then verify it works by
fetching my authenticated Figma identity and listing the plans I belong to.

I need the "Gush Design" team, not my personal one. The file I'll be working in
has key wqs3OgPvp03s0R0wUTzUHj and is named Ithaca.

Confirm you can read that file. If anything fails, tell me exactly which step
failed rather than retrying blindly.
```

**P−1.4 — Vercel**

```
Set up Vercel deployment for a static install page in a docs/ directory of this
repo. Use the free vercel.app subdomain, targeting ithaca-design.vercel.app —
tell me if that name is taken and suggest alternatives.

Deploy a placeholder page and give me the live URL. Then confirm that pushing to
main triggers a redeploy.
```

**Gate −1:** four passes. Remote is SSH. Figma file readable. Vercel live and redeploying on push.

---

### Phase 0 — Skeleton and trust loop (2–3 days)

**Goal:** prove install → restart → trigger → version announcement, against a skill that does nothing. Everything downstream lands here; find the friction now.

**P0.1 — Scaffold**

```
Set up a Claude Code plugin marketplace in this directory.

Marketplace name: ithaca
Plugin name: ithaca-design
Owner: Yash Binani

Requirements:
- Marketplace catalog at the conventional location, listing one plugin from a
  relative path within this repo
- Plugin manifest with name, description, version 0.1.0, author
- One skill directory named "agent" containing a SKILL.md
- A README explaining what this repo is and how releases work
- A retros/ directory with a placeholder

Do not add any component or design content yet. This phase is structure only.

Before writing anything, check the current Claude Code plugin documentation for
the correct file locations and required fields rather than working from memory.
Tell me which spec version you're building against, and tell me whether version
should live in the plugin manifest or the marketplace entry — set it in one place
only, never both.
```

**P0.2 — Canary skill**

```
Write the SKILL.md body for the agent skill. It is a canary — it does not build
anything yet.

It must:
1. Open every response with exactly: "Using the Ithaca agent skill — v0.1.0,
   updated <DATE>." Substitute today's actual date, formatted like "19 Aug 2026".
   Read the date from the system, don't guess it.
2. State that the design system is not yet authored and that it cannot generate
   screens.
3. Ask what the person was trying to build, and record nothing.

The frontmatter description must make this fire on requests to design or build a
screen, dashboard, page, or interface — without the person naming the skill.

Explain your reasoning for the description wording. That description is the
entire trigger mechanism and I want to understand the tradeoff you made between
firing too eagerly and not firing at all.
```

**P0.3 — Install and auto-update**

```
Install the ithaca marketplace and the ithaca-design plugin locally from the
current directory, then enable auto-update for the marketplace so the catalog
refreshes.

Show me each command before running it. After installing, tell me explicitly
whether I need to restart Claude Code or run a reload command, and why.
```

**P0.4 — Install page**

```
Create the static install page for ithaca-design in docs/, ready for Vercel.

It must contain:
- One-line install, copy-pasteable, including the auto-update step
- A no-terminal alternative: instructions a non-developer can paste into Claude
  Code instead
- Current version and last-updated date, read from the plugin manifest rather
  than hardcoded
- A restart warning
- A verification section: what to run, and the exact line the reply must open with
- A changelog section, currently empty

Visual direction, low-density mode: soft shadow for depth, warm gradient wash on
the page background, generous whitespace. No hairline-bordered panels. Body text
left-aligned, never centred. Two font weights maximum. One decorative accent
colour. Consistent corner radii. Light mode only — no dark mode styles.
```

#### Gate 0

- [ ] Plugin appears in the installed list
- [ ] After restart, *"design me a settings page"* triggers it without naming it
- [ ] Reply opens with the exact version line
- [ ] *"what's the capital of France"* does **not** trigger it
- [ ] Install page deploys; command works from a clean directory

#### Edge cases to test now

| Case | Expected |
|---|---|
| Install without restarting | Skill does not fire. Confirm the page warns |
| Stale version | Announcement line visibly mismatches the page |
| Auto-update disabled | Catalog never refreshes — confirm the failure is silent, which is why the step exists |
| *"make this better"* | Should not fire |
| Duplicate plugin name | Understand collision behaviour before it matters |

**Retro 0:** what the install friction actually was; whether the trigger fired too eagerly or too rarely.

---

### Phase 1 — Seed screens (2 weeks)

Designed by hand in the `Ithaca` Figma file. Claude Code assists with calibration and auditing only.

**P1.1 — Reference calibration**

```
Pull Mobbin screens for each of these, one search per item, and show them to me:

- Lindy home screen — gradient wash, soft-shadow cards, pill chips, low density
- Peec AI dashboard — dense hairline panels, sparklines, ranked tables
- Peec AI prompts table — row selection, bulk actions, sidebar filter tree
- Manus task view — chat plus work surface, tool-call rows, file list modal
- Linear issue detail — property rail, activity feed, sub-issue list
- Whop product page — pricing card, promo banner, FAQ accordion

For each, tell me the specific checkable rule you would extract: spacing values,
density thresholds, depth strategy, type scale, colour role. Numbers and
conditions, not adjectives. "Rows are 36px" not "feels tight."

Then find me three pairs of screens from different products solving the same
problem differently, ask me which I prefer and why, and derive a rule from each
answer.
```

**P1.2 — Coverage audit**

```
Here are the five screens I'm designing for Ithaca Design:

1. Agent chat with work surface — anchored to Manus. Three-region shell,
   composer, message types, tool-call rows, reasoning trace, streaming state,
   artifact card, file list, modal with tab filters.
2. Dense dashboard — anchored to Peec AI. Hairline panel grid, metric tiles,
   sparkline panel, ranked table, semantic tags, filter chip row.
3. Data table with bulk actions — anchored to Peec AI. Table, sortable headers,
   row selection, bulk-action toolbar, sidebar filter tree, pagination, search.
4. Record detail and settings — anchored to Linear. Property rail, property rows,
   inline edit, sub-item list, activity feed, comment composer, plus a real
   multi-field form with validation and a destructive confirm.
5. Commerce landing page — anchored to Whop. Hero, section wrappers, pricing
   card, promo banner, media block, FAQ accordion, footer, CTA.

Audit them for component coverage:
1. Full list of components each screen forces into existence
2. Components appearing in more than one screen — overlap is a wasted slot
3. What is missing entirely from all five
4. Whether screen 4 is carrying too much, given it's absorbing the entire form
   and validation surface on its own

Be direct. If you think this five leaves a real gap, say which and what to swap.
```

**P1.3 — State checklist**

```
For each of my five Ithaca seed screens, generate the complete list of states I
need to design in Figma.

Not just empty, loading and error. Include: partial data, overflow and
truncation, permission denied, stale or offline data, first-run versus returning,
and the ugly-data case.

For ugly data be specific per screen — a 340-character company name in the table,
a metric that hasn't computed on the dashboard, forty tags on one row, a chat
message with no response yet, a pricing card with a very long plan name.

Light mode only. Output as a checklist I can work through screen by screen.
```

#### Gate 1

- [ ] Five screens complete in the `Ithaca` file
- [ ] Every state from P1.3 designed, not just the happy path
- [ ] 35+ distinct components across the five
- [ ] No two screens are the same archetype
- [ ] Both density modes present — screen 5 and the empty states low, screens 2–4 high

**Retro 1:** which states you skipped and why. That predicts where the system breaks.

---

### Phase 2 — Spec extraction (2–3 weeks)

**P2.1 — Token layer**

```
Read my five seed screens from the Figma file wqs3OgPvp03s0R0wUTzUHj (Gush Design
team) and extract the token layer as canonical text in this repo.

Cover: colour ramps with semantic roles, type scale, spacing scale, radii, shadow
definitions, border weights.

Critical: two density modes with different depth strategies. Low density uses
soft shadow and permits a warm gradient wash. High density uses hairline borders
and no shadow at all. Tokens differing between modes must be declared per mode,
never averaged.

Theme: light mode only for v1. But author each colour ramp with its dark values
present and marked unused, so adding dark mode later is a mode addition rather
than a re-extraction.

Structure it so a brand can override values without forking the structure — I'll
register Gushwork as a second brand later.

Before writing, tell me which tokens you couldn't confidently extract and need me
to decide.
```

**P2.2 — Component contracts**

```
Author component contracts in the canonical spec, working through this list in
order. Do NOT do them all at once — do one group, show me, wait for my go-ahead,
then continue.

GROUP 1 — PRIMITIVES
button, icon button, input, textarea, select, combobox, checkbox, radio, switch,
badge, tag, avatar, icon, tooltip, link, spinner, progress bar

GROUP 2 — LAYOUT
app shell, sidebar nav, nav group, nav item, top bar, breadcrumb, page header,
two-column split, three-region split

GROUP 3 — DATA
table, table row, sortable column header, cell variants, pagination, search
field, filter bar, filter chip, sidebar filter tree, bulk-action toolbar,
empty state, sparkline panel, metric tile

GROUP 4 — SURFACES
card, hairline panel, list item, accordion, tabs, divider

GROUP 5 — OVERLAYS
modal, drawer, popover, dropdown menu, toast, confirm dialog

GROUP 6 — AGENT
chat composer, user message, assistant message, tool-call row, reasoning trace,
streaming indicator, artifact card, work-surface pane with tabs, file list item,
task status row

GROUP 7 — DETAIL
property rail, property row, inline edit field, sub-item list, activity feed item,
comment composer

GROUP 8 — MARKETING
hero, section wrapper, pricing card, promo banner, media block, FAQ accordion,
footer, CTA block

For each component include: purpose; when to use it; when NOT to use it and what
to use instead; variants; every state; density behaviour in both modes;
composition rules — what it may and may not be placed inside or next to; and
accessibility requirements.

Write for an agent to read, not a human to browse. Be explicit about
prohibitions — an agent needs rules it can fail, not guidance it can interpret.

No implementation code. These are contracts.
```

**P2.3 — Rules layer**

```
Author the rules layer of the Ithaca spec. Three sections.

SELECTION RULES — when to reach for which component. Every rule needs a threshold
or condition, not a preference. "Tables over cards above five rows," not "prefer
tables."

DENSITY RULES — everything that changes between low and high density mode.

REFUSAL RULES — hard prohibitions, self-checked before emission:
1. No more than 2 font weights on a screen
2. No shadows layered on a coloured background; no shadows at all in high-density
   mode
3. No icon-only buttons without a visible label
4. High-density rows no taller than 44px; minimum 12 rows visible in a 900px
   viewport
5. One radius scale per surface, no exceptions within a surface
6. One decorative accent colour per screen, plus 4 semantic roles (success,
   warning, danger, info) usable only where they carry real status meaning
7. No centred body text

EXPLICITLY PERMITTED — state as an exception so it doesn't get over-corrected:
gradients as atmosphere and surface in low-density mode. The warm gradient wash
is load-bearing there.

SCOPED PERMISSION: bolder, more chromatic colour is permitted on marketing
surfaces and empty states only, never app chrome. Colour where there's nothing to
read; restraint where there's data.

For each refusal rule, write the self-check an agent can actually run before
emitting. A rule that cannot be checked is decoration.
```

**P2.4 — Motion calibration**

```
Motion is in scope for Ithaca but cannot be extracted from static screens.

Search Mobbin FLOWS — not screens — for these and show me the step sequences:
- Lindy agent task execution
- Peec AI dashboard filtering and drill-down
- Linear issue creation
- An agent tool-call sequence completing

From these, propose a motion token set: durations, easing curves, and which
transitions are permitted where. Then propose motion refusal rules — what should
never animate.

Three categories: state transitions, entrance and exit, streaming and progress.
Density matters here too — high-density surfaces should move less.

Ask me to approve each duration rather than assuming.
```

#### Gate 2

- [ ] Every component in the seed screens has a contract
- [ ] Every contract declares behaviour in both density modes
- [ ] Every refusal rule has a number or binary condition
- [ ] Every refusal rule has a stated self-check
- [ ] Motion tokens and motion refusal rules exist
- [ ] Spec is text, committed, diffable in a PR
- [ ] **Reading only the spec, a person could rebuild a seed screen without seeing it**

Actually try that last one.

---

### Phase 3 — Agent surfaces skill (1–2 weeks)

Built first because it is the differentiated one.

**P3.1 — Skill body**

```
Write the SKILL.md for the Ithaca agent skill. It generates chat interfaces,
tool-call displays, reasoning traces, split work surfaces, artifact cards and
streaming states.

The body must contain, in this order:
1. Version announcement line, exact format, matching the manifest version
2. Operator detection — infer whether the prompt comes from a PM or a designer.
   Vague or feature-shaped prompts get interrogation and locked archetypes.
   Specific prompts using system vocabulary get less friction
3. The clarifying question flow: two or three questions maximum, covering
   density, archetype and data shape. Never more than three
4. The component index — names and one-line purposes only, not full contracts
5. Instructions to load individual contracts on demand
6. The refusal-rule self-check, run before emitting
7. The archetype list, with instructions to select from it rather than invent
   layout

Keep the always-loaded body small. Contracts load on demand.

Tell me the approximate token cost of the always-loaded portion.
```

**P3.2 — Emitter**

```
Add code emission instructions to the Ithaca agent skill.

Target: React with Tailwind, using our own primitives — derived from shadcn,
copied into the repo and restyled, so accessibility behaviour is inherited but no
default styling remains.

The skill must reference our primitives by name from the spec and must never
import a component absent from the spec. If a requested screen needs a component
we don't have, it must say so and stop rather than inventing one.

That last behaviour is the important one. Make it explicit and unambiguous.
```

#### Gate 3

- [ ] Fires on agent-interface requests
- [ ] Asks two or three questions — never more, never zero
- [ ] Vague PM prompt triggers interrogation
- [ ] Specific prompt with system vocabulary skips most of it
- [ ] **A request for a component that doesn't exist produces a refusal, not an invention**
- [ ] Output contains no component absent from the spec
- [ ] A high-density screen contains no shadows

Item five is the single most important test in this document. An agent that silently invents components defeats the entire system, and it will do that by default unless forbidden in unambiguous terms.

---

### Phase 4 — Retrieval layer (1 week)

**P4.1**

```
Restructure ithaca-design for progressive disclosure.

The always-loaded skill body should hold only: version line, routing logic,
clarifying question flow, rules layer, archetype list, and a compact index of
component names with one-line purposes.

Full component contracts live in separate files, loaded only when needed.

Then tell me:
1. Current always-loaded token count
2. What it would be at 100 components, and at 400
3. Where the index itself becomes too large, and what to do at that point
```

#### Gate 4

- [ ] Always-loaded portion small and measured
- [ ] Contracts demonstrably load on demand
- [ ] A simple screen loads fewer contracts than a complex one
- [ ] Projected cost at 400 components acceptable

---

### Phase 5 — Validation harness (1 week)

The acceptance test. The only honest measure of whether the system carries your taste.

**P5.1 — Regeneration**

```
Set up a regeneration test for ithaca-design.

For each of my five seed screens, write a plain-language prompt a PM might
realistically type — no system vocabulary, no component names. For example, for
the dashboard: "I need a page showing how our brand is performing across AI
models."

Run each and produce the screen. For each, report:
1. Which components were used
2. Which components the original used but the output did not
3. Any refusal-rule violation in the output
4. Which states were generated and which were missed

Where output diverges from the original, tell me whether the cause is a missing
component, a missing rule, or an ambiguous prompt. Be specific — "missing rule"
without naming the rule is useless.
```

**P5.2 — Adversarial**

```
Try to break ithaca-design. Generate:
1. A screen with deliberately ugly data — a 340-character company name, forty
   tags on one row, a metric that hasn't computed
2. A screen from a maximally vague prompt: "make me a page for the thing"
3. A screen requesting something the spec has no component for — a calendar with
   drag-to-reschedule
4. A screen mixing density modes: a dense data table on a warm gradient background
5. A screen requested by someone using the wrong vocabulary confidently — asking
   for "cards" when the data clearly needs a table

For each, report what the skill did and whether that was correct. I expect
refusals on 3 and 4, and a corrective selection rule on 5.
```

#### Gate 5 — the acceptance test

- [ ] All five seed screens regenerate **recognisably** from plain-language prompts
- [ ] Zero refusal-rule violations
- [ ] Ugly data degrades gracefully rather than breaking layout
- [ ] Vague prompt interrogates rather than guesses
- [ ] Missing-component request refuses
- [ ] Mixed-density request refuses, or picks one and says which

**If screens don't regenerate recognisably, the spec is incomplete.** Diagnostic, not failure — the gap is locatable, and this is what the phase is for. Fix the spec, re-run. Do not proceed with a failing gate.

---

### Phase 6 — Remaining skills (2–3 weeks)

**P6.1**

```
Create the "app" skill for ithaca-design, covering dashboards, tables, detail
views, forms and settings.

Follow the same structure as the agent skill: version line, operator detection,
two-to-three question flow, component index, on-demand contract loading,
refusal-rule self-check, archetype list.

Most components already exist from seed screens 2, 3 and 4 — reuse, don't
duplicate. Tell me which components you had to add.

Then confirm the two skills don't cross-fire: a request for an agent chat must
not trigger this one, and a request for a dashboard must not trigger the agent
skill.
```

**P6.2**

```
Create the "web" skill for ithaca-design, covering marketing and landing pages.

Same structure as the other two. Archetypes come from seed screen 5.

This is the only skill where the scoped colour permission applies — bolder,
more chromatic colour is allowed here and in empty states, never in app chrome.
Make that explicit in the skill body so it doesn't leak into the app skill.

Then test all three skills for cross-firing against ten mixed prompts and report
which skill fired for each.
```

#### Gate 6

- [ ] Three skills, each firing on the right intent
- [ ] No cross-firing across ten test prompts
- [ ] All three announce their own version
- [ ] Shared components behave identically across all three

---

### Phase 7 — Figma emitter (1–2 weeks, expect friction)

**P7.1**

```
Add a Figma emission path to ithaca-design using the Figma MCP.

Target file key: wqs3OgPvp03s0R0wUTzUHj, Gush Design team.

It must generate from the canonical spec, never from code output — the spec is
the single source and Figma is a projection, not a peer.

Bundle the Figma MCP configuration inside the plugin so a PM needs no separate
setup.

Start with tokens only: colour ramps, type scale, spacing as Figma variables,
with the two density modes as variable modes. Light mode only. Do not attempt
components until tokens round-trip correctly.

Report explicitly what the spec expresses that Figma cannot.
```

#### Gate 7

- [ ] Tokens appear as Figma variables matching the spec exactly
- [ ] Density modes map to variable modes
- [ ] MCP config ships with the plugin — verified on a clean install
- [ ] Spec remains the only authoring surface
- [ ] Documented list of what doesn't survive the projection

---

### Phase 8 — Showroom (1 week)

**P8.1**

```
Build a component showroom page in docs/, generated from the canonical spec so it
cannot drift.

Requirements:
- Every component in the spec, rendered live
- Every state, including the ugly-data case
- Both density modes shown in separate sections, never mixed on one page
- Adding a component to the spec must make it appear here with no manual work
- Light mode only

Then add it to the Vercel deploy and confirm it rebuilds on push.
```

#### Gate 8

- [ ] Every spec component appears
- [ ] A new spec component appears with no manual work
- [ ] Density modes separated
- [ ] Every state visible, including ugly data

---

### Phase 9 — Second brand: Gushwork (1 week)

**P9.1**

```
Register Gushwork as a second brand in ithaca-design.

It must override token values only. It must not fork the component contracts,
the rules layer, or the archetypes.

Then generate the same dashboard screen under both brands and show me the
difference side by side.

If registering this brand requires changing anything outside the token layer,
stop and tell me — that means the architecture is wrong and I need to know now
rather than at the third brand.
```

#### Gate 9

- [ ] Registered by token override only
- [ ] Same prompt under two brands produces visibly different, on-brand output
- [ ] Zero token leakage between brands
- [ ] Refusal rules apply equally under both

---

## Part C — Milestones

| Milestone | Contents | Part-time | Full-time |
|---|---|---|---|
| **M0 — Trust loop** | Phases −1, 0 | 3–4 days | 1–2 days |
| **M1 — Raw material** | Phase 1 | 2 weeks | 1 week |
| **M2 — System exists** | Phase 2 | 3 weeks | 1.5 weeks |
| **M3 — First real output** | Phases 3–4 | 3 weeks | 1.5 weeks |
| **M4 — Trustworthy** | Phase 5 | 1 week | 3 days |
| **M5 — Complete v1** | Phases 6–8 | 4 weeks | 2 weeks |
| **M6 — Multi-brand** | Phase 9 | 1 week | 3 days |

**M4 is the release milestone.** Everything before is unvalidated; everything after is expansion. If you have to stop, stop at M4 with one skill working and trusted — not at M3 with three skills nobody has verified.

**To M4:** 9–10 weeks part-time. **To M6:** 14–15 weeks. The full masterplan scope — 400+ components across three surfaces — runs four to six months with no meaningful completion date. The reference plugin is on release thirty-nine.

---

## Part D — Reflection and success validation

### After every phase

Commit `retros/phase-N.md`:

1. What took longer than estimated, and what specifically was underestimated?
2. What did the validation gate catch that you would have shipped?
3. What rule is missing that you only discovered by looking at output?

Question three is how the rules layer actually gets built — not by planning, but by generating, wincing, and writing down why.

### Weekly, once generating

Three screens from prompts you haven't used before:

| Signal | Target |
|---|---|
| First-shot acceptance — usable unchanged | Above 60% by M5 |
| Refusal-rule violations | Zero. Any violation is a bug, not a preference |
| Invented components not in spec | Zero. Non-negotiable |
| Rounds to acceptable | Two or fewer |
| Missing-rule discoveries per week | Declining. Rising means the spec is fragmenting |

### Success

Works if: a PM describes a feature and gets a screen a designer wouldn't rebuild; a designer uses it for scaffolding and doesn't route around it; output is recognisably yours to someone who knows your work without being told; adding a component is a pull request; a new brand is a token file; and nobody can tell you what version they're on, because every reply says so.

Failed if: output is competent and anonymous — which means the rules layer is thin, not that the library is small; people stop using it without filing a bug, which is what silent failure looks like; spec and Figma diverge again; or you are the only person who can add to it.

---

## Part E — State matrix

Every contract must declare all of these.

**Interaction:** default, hover, focus-visible, active, disabled, read-only, loading, success, error.

**Data:**

| State | Meaning |
|---|---|
| Empty — first run | Never had data. Needs guidance, not an error |
| Empty — filtered | Had data, filter excluded it. Needs a clear-filter action |
| Partial | Some fields present, some not computed |
| Single item | One row, one card. Frequently looks broken |
| Overflow | More data than fits |
| Ugly data | Extreme lengths, unexpected characters, unresolved values |
| Stale | Known out of date |
| Permission denied | Exists but not visible to this user |
| Failed to load | Distinct from empty, and must look distinct |

**Density:** every component in both modes, depth strategy switching accordingly.

**Motion:** state transition, entrance and exit, streaming and progress. High-density surfaces move less.

**Responsive:** desktop, tablet, mobile-web. Native app out of scope.

**Theme:** light only for v1. Dark values authored but unused.

---

## Part F — Edge cases and failure modes

### Plugin and distribution

| Case | Handling |
|---|---|
| Installed without restart | Version line absent. Install page must warn |
| Stale install | Version in reply mismatches the page. Visible, never silent |
| Auto-update not enabled | Catalog never refreshes. Enforced at install |
| Version set in two places | One silently wins. Set it in one place only |
| Private repo, background update over HTTPS | Fails intermittently. SSH remote avoids it entirely |
| Plugin references files outside its directory | Fails — plugins are copied, not linked |

### Generation

| Case | Expected |
|---|---|
| Requested component doesn't exist | Refuse and say so. Never invent |
| Prompt mixes density modes | Refuse, or pick one and state which |
| Prompt too vague | Interrogate. Never guess |
| Prompt conflicts with a refusal rule | Refuse and cite the rule |
| Brand unspecified, multiple registered | Ask. Never default silently |
| Needs an undefined pattern | Refuse — this is how missing patterns get found |
| Designer wants to break a rule deliberately | Escape hatch must exist and be documented, or they route around the system entirely |

### Spec integrity

| Case | Handling |
|---|---|
| Two components claim the same purpose | Selection rule disambiguates, or one gets deleted |
| Contract contradicts a rule | Rule wins. Rules are the spine |
| Figma diverges from spec | Spec wins. Regenerate Figma |
| Brand override reaches beyond tokens | Architecture violation. Stop and fix |

---

## Part G — Expected outcomes

| Phase | Outcome |
|---|---|
| −1 | Environment verified, private repo on SSH, Figma MCP working, Vercel live |
| 0 | Installable plugin that announces itself. No design content |
| 1 | Five complete Figma screens, all states, ~40 components implied |
| 2 | Canonical text spec: tokens, ~66 contracts, rules, motion. Reviewable as a PR |
| 3 | One working skill generating agent surfaces from plain language |
| 4 | Library size decoupled from context cost |
| 5 | Seed screens regenerate recognisably. Zero violations. **Now trustworthy** |
| 6 | Three skills: agent, app, web |
| 7 | Figma as a generated projection |
| 8 | Live showroom that cannot drift |
| 9 | Multi-brand proven, not assumed |

### At the end

A versioned, auto-updating Claude Code plugin any teammate installs with one command. Three skills fire on intent. A PM describes a feature and receives an on-system, on-brand screen with correct states, without knowing a single component name. A designer gets scaffolding in seconds and a documented way to deviate. The system refuses rather than inventing. Gushwork and Ithaca are token files over one shared engine. Adding a component is a pull request. Every reply states its own version, so nobody debugs a phantom.

The library will be large. That is not the achievement. The achievement is that the output looks like it was made by someone with a point of view — and that is carried by the rules layer, not the component count.
