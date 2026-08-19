# masterplan.md

**Working title:** Design System Plugin (name TBD)
**Owner:** Yash Binani
**Status:** Blueprint — pre-build
**Date:** 19 August 2026

---

## 1. Overview and objectives

A Claude Code plugin that encodes a design system — tokens, components, composition patterns, and design judgment — so that agentic tools generate product screens using real system parts instead of inventing generic ones.

The reference implementation is Yash's own aesthetic. The architecture supports multiple brands (Gushwork, Nudge AI, others) as registered configurations rather than forks.

**Primary objective.** A PM or designer describes a feature in plain language and receives a screen that is on-system, on-brand, and shippable — without needing to know the component vocabulary in advance.

**Secondary objectives.**

- Establish a single canonical definition of the system, ending the current Figma/code drift.
- Emit to two targets from one source: running front-end code, and Figma via MCP.
- Make the system's judgment explicit and checkable, not implicit in a designer's head.
- Serve as a public, installable demonstration of design judgment.

**The core thesis.** A large component library alone produces competent generic output. What makes output feel authored is the layer above the components: which part to reach for in a given situation, what density demands, and what is refused outright. Inventory is the vocabulary; rules are the voice. Most design-system plugins ship only the vocabulary.

---

## 2. Target audience

**Primary — internal PMs and engineers.** Cannot reliably judge whether output is good. Need a floor, not a ceiling. The system should interrogate vague prompts, lock to known archetypes, and refuse to improvise layout.

**Secondary — internal and external designers.** Want leverage, not guardrails. Need fast scaffolding they can then deviate from deliberately.

**Resolution: PM-first defaults with designer escape hatches.** The skill infers operator type from the prompt. Vague or feature-shaped prompts trigger clarifying questions and archetype locking. Specific prompts using system vocabulary get out of the way.

**Tertiary — Yash, as a public artifact.** A working, installable proof of design judgment.

---

## 3. Core features and functionality

**Intent-triggered skills.** Three skills, firing on the nature of the work rather than by name:

| Skill | Covers |
|---|---|
| App / dashboard | Tables, lists, detail views, forms, settings, filtering, modals |
| Marketing web | Landing pages, sections, pricing, docs surfaces |
| Agent surfaces | Chat, tool-call rows, reasoning traces, split work surfaces, artifact cards, streaming state |

Agent surfaces is the differentiator. It is largely absent from existing design systems, both target products are AI products, and it is where the library is genuinely state-of-the-art rather than merely large. **Build it first.**

**Clarifying interrogation.** Before generating, the skill asks two or three questions — density, archetype, data shape. Deliberate friction, and the main PM guardrail.

**Version announcement.** Every response opens with a line naming the skill and its version. Converts silent failure — the primary killer of internal tooling — into visible failure. The version string is rewritten by the release process, never by hand.

**Density-aware generation.** The skill classifies the requested screen as low- or high-density and applies the corresponding surface language (see §6). Non-optional; the two languages are mutually exclusive.

**Refusal rules.** A short list of hard prohibitions the agent self-checks against before emitting.

**Dual emission.** Code as primary output. Figma via MCP as a projection of the same spec, never a peer authoring surface.

**Bundled MCP configuration.** The Figma MCP ships inside the plugin, so the Figma path works on install with nothing for a PM to configure.

**Install and verification page.** Static page with a one-command install, a no-terminal alternative, the current version, a changelog, and a verification ritual.

---

## 4. High-level technical stack recommendations

**Distribution: Claude Code plugin via a GitHub-hosted marketplace.** A repo containing a marketplace catalog, a plugin manifest, and skill directories. No hosting or build infrastructure required for the plugin itself.

*Alternative considered:* manually distributed skill folders. Rejected — no version tracking, no auto-update, and stale installs fail invisibly.

**Canonical source: a text spec in the repo.** Tokens, component contracts, patterns, and rules as plain structured text, reviewed through pull requests.

*Why this, and why it reversed mid-discussion.* Figma was initially chosen as canonical, then reconsidered once it became clear no substantial system exists there yet. There is nothing to extract, so this is greenfield authoring, and the format should serve the consumer. The skill is itself text — making the canonical layer text means the skill *is* the system rather than a translation of it, with no extraction step to go stale. Figma becomes a generated consumption surface for the design team.

*Cost:* designers must accept Figma as a mirror rather than an authoring surface. This is a cultural change, not a technical one, and it is where this approach usually fails.

**Code target: shadcn foundations, restyled into own primitives.** These are not competing options — shadcn is copied into the repo and owned. Take the accessibility-hard parts (focus management, keyboard handling, dialogs, comboboxes, screen-reader semantics) and restyle until nothing of the default appearance survives.

**Retrieval: progressive disclosure.** A large library cannot fit in context. The skill body holds the index, the routing logic, and the rules — always loaded, deliberately small. Individual component definitions load on demand. This is the central piece of engineering in the project.

**Figma emission: MCP, downstream, generated.** Expect this to be the least deterministic part of the system.

**Docs site: static, generated from the spec.** Phase one carries install, version, and verification. The component showroom follows in phase two, generated so it cannot fall out of date.

**Seed screens: designed in Figma first, then dissected.** Systems extracted from real screens beat systems designed in the abstract, because the abstract version optimises for tidiness and the extracted version has survived contact with real content.

---

## 5. Conceptual data model

Seven layers. Each lower layer composes from the ones above it.

**Brands.** Named configurations — Gushwork, Nudge AI, the reference brand. A brand supplies token values and may override rules. It does not fork the engine.

**Tokens.** Colour ramps, type scale, spacing scale, radii, shadow definitions, motion durations. Every token belongs to a density mode where the two modes differ.

**Primitives.** Indivisible elements — button, input, checkbox, badge, avatar, icon. Each carries variants, states (default, hover, focus, disabled, loading, error), and density behaviour.

**Components.** Primitives composed into recognisable units — table, card, form field group, filter bar, nav item, tool-call row, artifact card.

**Patterns.** How components relate to each other. *The most under-served layer in most systems and the one that most determines whether output looks designed.* Example: the relationship between a filter bar, a table, a bulk-action toolbar, and an empty state — four components whose spacing, ordering, and interaction dependencies constitute one pattern.

**Archetypes.** Whole-screen templates the agent selects from rather than inventing. Locked structure; the agent varies content and composition inside them. This is the lesson carried over from InstantlyPages v1.

**Rules.** Three kinds, and the layer where taste actually lives:

- *Selection rules* — when to reach for which component. "Tables over cards above five rows."
- *Density rules* — what changes between low and high density.
- *Refusal rules* — hard prohibitions, self-checked before emission.

Rules are hand-authored and permanent. They cannot be extracted from Figma, from code, or from reference screens.

---

## 6. User interface design principles

Derived from judgments about real screens rather than from self-description. The method matters: descriptive adjectives ("minimal", "neat", "clean") are unfalsifiable and produce generic output. What follows is checkable.

### Two density modes

The system's two strongest references are aesthetic opposites, and this is the resolution rather than a compromise. Lindy supplies the **surface** language; Peec supplies the **structural** language. They apply at different densities and never mix on one surface.

| | Low density | High density |
|---|---|---|
| Applies to | Entry, onboarding, empty states, marketing, single-task | Tables, dashboards, lists, settings |
| Depth via | Soft shadow, elevated cards | Hairline borders, no shadow |
| Background | Warm gradient wash permitted | Flat neutral |
| Type | Larger, generous leading | ~12–13px, tight rows |
| Colour | Decorative accent permitted | Semantic only — status, category |

A shadowed card at high density reads as visual mud. A hairline table on a gradient reads as unfinished. Unresolved, an agent averages the two and produces work that is subtly wrong in ways nobody can name.

### Refusal rules

Never ship:

1. More than two font weights on a screen
2. Shadows layered on a coloured background
3. Icon-only buttons without labels
4. Row heights so tall that little data is visible
5. Inconsistent corner radii within a surface
6. More than the sanctioned number of accent colours
7. Centred body text

**Explicitly permitted:** gradients as atmosphere and surface. This is a deliberate exception, not an oversight — the warm gradient wash is load-bearing in the low-density mode.

### Reference handling

References teach **rules**, never components. The pipeline runs reference → extracted rule → own component. Reconstructing another product's UI is both an IP problem and self-defeating, since it stops the output being yours.

### Hard states

Every archetype must define its empty, loading, error, overflow, and ugly-data states. This is where systems fail, and precisely what a PM will generate first.

---

## 7. Security and governance considerations

**Plugin trust.** Installing a plugin runs code from a repo on a developer machine. Keep the marketplace repo access-controlled and treat merges as releases.

**Versioning discipline.** Setting a version pins users to it — they receive nothing until it changes. Omitting it falls back to the commit SHA and updates on every push. Choose deliberately and never set it in two places.

**Auto-update.** Must be enabled explicitly or the catalog never refreshes and users sit on an old version indefinitely with no error.

**Brand isolation.** One brand's tokens must never leak into another's output. Test explicitly.

**IP hygiene.** Reference screens are inputs to rules, never sources for components. Worth stating in the repo, not just holding as an intention.

**No secrets in the plugin.** Plugins are copied to a local cache in plain text.

---

## 8. Development phases

**Phase 0 — Skeleton (2–3 days).** Marketplace repo, plugin manifest, one trivial skill, install page. Prove the install, restart, trigger, and version-announcement loop end to end before there is any content to lose. Get into the feedback loop in week one, not week ten.

**Phase 1 — Seed screens (2 weeks).** Five screens designed in Figma, taken to completion — every state, worst-case data, hardest version. Chosen for component coverage, not for how good they will look. Between them they should force roughly forty distinct components into existence. Prefer breadth: a form, a modal layer, filtering, two-depth navigation, a detail view.

**Phase 2 — Spec extraction (2–3 weeks).** Tokens and ~50 components authored as canonical text. Reconcile per component as authored; no big-bang audit.

**Phase 3 — Agent surfaces skill (1–2 weeks).** The differentiated skill, built first among the three. Routing, question flow, refusal-rule self-check.

**Phase 4 — Retrieval layer (1 week).** Index and progressive disclosure. The point at which library size stops being a constraint.

**Phase 5 — Validation (1 week).** The acceptance test: **the plugin must regenerate the original seed screens from plain-language prompts, recognisably.** If it cannot reproduce the screens it was extracted from, the spec is incomplete and the gap is locatable. This is the regression suite and the only honest measure of whether the system carries the taste or merely the colours.

**Phase 6 — Second and third skills.** Dashboard, then marketing web.

**Phase 7 — Figma emitter (1–2 weeks).** Downstream projection over MCP. Expect friction.

**Phase 8 — Showroom.** Generated from the spec, so it cannot drift.

**Phase 9 — Second brand.** Register Gushwork or Nudge as a brand configuration. First real test of whether the multi-brand architecture holds.

### Honest timeline

A credible v1 — one surface, ~50 components, PM-safe: **six to eight weeks part-time**, roughly three full-time. The full scope described — 400+ components, three surfaces, both emitters: **four to six months**, with no meaningful completion date. The Gushwork reference plugin reads v1.39.0; that is thirty-nine releases. This is a maintained system, not a project that finishes.

The real constraint is not calendar but iteration: prompt, inspect, find the missing rule, write it, repeat. That loop cannot be shortened by planning harder, and it is where the months go.

---

## 9. Potential challenges and solutions

| Challenge | Approach |
|---|---|
| Library too large for context | Progressive disclosure — small always-loaded index, on-demand definitions |
| Component count mistaken for quality | 10 screens yields ~50 components, not 400. Scale comes from primitives × variants × states plus the pattern layer, and patterns matter more than count |
| Figma/code drift | Avoided rather than solved: one canonical text source, Figma generated downstream |
| Designers resist Figma as a mirror | Cultural, not technical. Address directly or the canonical source quietly stops being canonical |
| Silent failure | Version announcement, install verification ritual, changelog |
| Stale installs | Auto-update enabled at install; version visible in every response |
| Generic output despite the library | The rules layer. Refusal rules especially — prohibitions produce a point of view where preferences produce mush |
| Two conflicting reference aesthetics | Resolved as density modes, not averaged |
| Taste is hard to articulate | Derive rules from pair judgments rather than self-description. Already validated in discussion |
| Both output targets drifting apart | Code canonical, Figma a projection. Never author twice |
| Scope collapse under three surfaces | Ship agent surfaces alone first |

---

## 10. Future expansion possibilities

**The taste compiler.** The infrastructure to onboard a new brand by pointing at an existing system and deriving its rules — including the pair-judgment calibration process, run against a new owner. This is the general version of the product. It only becomes credible once the reference brand proves the pipeline, which is the argument for building brands as configuration from day one.

**Native mobile.** Deferred deliberately. Separate navigation patterns, separate component vocabulary, separate emitter. A genuinely different system, not a breakpoint.

**Visual regression on the showroom.** Catching unintended change when the spec moves.

**Public distribution.** The internal system, opened. Requires the IP boundary to be airtight and the brand layer to be genuinely swappable.

**Design Autopilot integration.** The existing Linear → Claude → Figma pipeline is the same architectural shape pointed outward. Worth connecting rather than rebuilding.

---

## 11. Open questions

1. **Manus specifically.** The Mobbin search did not return Manus screens; the agent-surface read is based on Lindy and ChatGPT proxies. Needs confirmation against the actual screens.
2. **ClickUp and Whop.** Both are considerably louder and more chromatic than every other reference. What is being taken from them? If it is colour confidence, that is a rule. If it is familiarity, they should leave the reference set.
3. **Accent colour count.** Refusal rule 6 needs a number.
4. **Motion.** Entirely unaddressed. Not extractable from static screens, and it is a real component of feel.
5. **Naming.** The plugin, the marketplace, the skills.
6. **Second brand priority.** Gushwork or Nudge first?
7. **Seed screen selection.** The five need choosing against component coverage rather than frequency.
