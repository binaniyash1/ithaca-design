# reference-rules.md

Rules extracted from reference screens. **P1.1 output; feeds P2.3.**

The pipeline is **reference → extracted rule → own component.** Never
reference → component. Nothing here is a component; everything here is a
condition an agent can fail.

Measurements are derived from Mobbin captures rendered at 768px from roughly a
1440px viewport (~1.875×). **Ratios and counts are reliable; absolute pixels
carry roughly ±2px** and should be re-derived from the seed screens at P2.1.

---

## Part 1 — Per-reference rules

### Lindy — surface language (low density)

- Above the fold in a low-density entry screen: **at most 3 element types**.
- Composer occupies **~49% of viewport width**, centred.
- **The gradient is on the page. The shadow is on an opaque card.** Lindy never
  puts a shadow on a tinted surface — independent confirmation of the fix in
  [rules-pending 001](rules-pending.md).
- Chips are pills (radius = height ÷ 2) and **always carry icon + label**.
- Chips wrap at 4 per row; vertical row gap ≈ half the horizontal gap.

### Peec — structural language (high density)

- Panel depth is **1px hairline, small radius, zero shadow**.
- Panel grid gutter ≈ **8px**; columns equal width.
- Ranked table rows ≈ **30px**, ≥8 rows visible per panel.
- **Semantic colour appears only on categorical tags and status dots.** Never on
  numerals, never on panel chrome.
- ≥3 nav groups ⇒ every group carries a label.
- Filter controls sit in **one row**, all the same height, above the content.

### Peec — selection and bulk actions

- Filter-tree rows carry a **right-aligned count, present even at 0**.
- Selection column is fixed **~24–28px** and always leftmost.
- **Row height grows with wrapped content.** The reference does not enforce a
  fixed row ceiling — direct evidence for scoping
  [rules-pending 004](rules-pending.md) rather than treating 44px as absolute.

### Manus — agent surfaces

> **Manus 1.6 no longer supports the three-region pattern.** It ships
> two-region — nav plus a single centred chat column, artifacts inline in the
> transcript, no persistent right-hand pane. Manus previously shipped a
> three-region layout, so this is a product that **moved away** from the
> pattern. Recorded as evidence *against*, not as a reason to abandon it. See
> [The right-hand pane](#the-right-hand-pane-a-split-field).

- **Message containers are asymmetric: the user turn gets a bordered card, the
  assistant turn gets no container at all.**
- Tool calls are indented one level under **a single collapsible group header**,
  never listed flat in the transcript.
- A run tracker is **pinned directly above the composer** — elapsed time, step
  `N/M`, collapse control. Persistent, not inline.
- Composer actions: **≤3 leading, ≤2 trailing**.

### Linear — detail discipline

- Three-pane split: nav **~15%** / content **~61%** / property rail **~21%**.
- Rail groups carry a header and **at most 5 rows**.
- Sub-item progress is a **count (`0/4`), never a percentage**.
- **A system event and a human comment are different components**: the event is
  one dim line with no avatar block; the comment carries avatar, name, timestamp
  and body.

### Whop — commerce colour

- Saturated colour appears in **exactly three places**: promo banner, primary
  CTA, savings badge. Nowhere else on the page.
- Promo banner is full-bleed, sits above all chrome, **≤1 line of text + 1 CTA**.
- A pricing card carries **exactly one saturated element** — its CTA.
- A superseded price sits **inline before** the new price, same size, muted,
  struck through.
- FAQ items are separated by a **1px divider only — never one card per item**.

---

## Part 2 — Rules derived from pair judgements

Three pairs, three choices. **All three chose the more restrained option**, and
they chose it consistently enough to be one rule rather than three.

### R1 — An absent value is reported, not sold

*Chosen: Peec's `--` over Linear's "Set priority" affordance. The
"split by context" option was offered and declined.*

> **A value slot with no value renders a neutral placeholder. It never renders
> an imperative verb.**
>
> **The row stays live.** An empty row is not a disabled row. It keeps the same
> hit target, the same hover treatment, the same focus behaviour and the same
> click-to-edit action as a filled one. **What changes is the label, not the
> affordance.**

The rule governs *what the value slot says*, not *whether the row responds*.
Those are separate, and conflating them would trade one bad outcome for a worse
one: a rail of rows that look inert and cannot be filled at all.

**Where the action lives instead:** the row's hover state, click-to-edit on the
row itself, or an explicit edit mode. Never in the resting value slot.

**Explicitly prohibited on an empty row:**

- reduced opacity, or any treatment that reads as disabled
- removal of the hover state
- removal from the focus order
- a smaller or absent hit target compared to a filled row

**Self-checks:**

1. Does any resting value slot contain an imperative verb ("Set…", "Add…",
   "Assign…", "Choose…")? If yes, it fails.
2. Does the empty row have the same hover treatment and the same hit target as a
   filled row in the same list? If not, it fails.
3. Is the empty row keyboard-focusable and does it accept the same edit action
   as a filled row? If not, it fails.

**Consequences, both real:**

1. **Atlas row 45's note predates this rule and contradicts it.** Fixed — the row
   now states the placeholder rule and the interactivity requirement together.
2. **`Data/Property row` State=Empty is built the rejected way** (it renders
   "Set priority" in the value slot) and needs rebuilding when the atlas resumes.
   The rebuild must satisfy all three self-checks above, not just the first.
3. This diverges from Linear, the anchor reference for seed screen 4. That is
   allowed and expected — references teach rules, and a rule may be *reacting
   against* what a reference does. Stated here so nobody later "fixes" the
   divergence back.

### R2 — On-demand chrome overlays; it never reflows

*Chosen: Midday's floating pill over Peec's persistent bottom bar.*

> **Chrome that appears in response to a user action must overlay the content,
> and must occupy zero height when absent.** Chrome that is always present must
> hold its space at all times.

This reconciles with the reservation pattern used throughout the atlas rather
than contradicting it. The distinction is **in-flow versus overlay**:

- **In-flow** elements that come and go (hover actions in a row, an action bar
  under a message) **must reserve their space**, or the content jumps.
- **Overlay** elements (selection toolbars, popovers, menus) **must not reserve
  space**, because they float above and displace nothing.

**Self-check:** if this element can be absent, does it overlay? If it does not
overlay, is its space reserved when absent? One of the two must be true.

### R3 — Emphasis changes fill, never structure

*Chosen: Dribbble's corner badge + coloured CTA over Asana's filled band +
bordered card.*

> **Sibling items in a comparison set are structurally identical** — same width,
> padding, border weight, radius, and internal order. Emphasis is carried by a
> badge and a colour change only.

**Self-check:** do all siblings in the set share width, padding, border weight
and radius? If one differs structurally, it fails.

### The through-line

All three answers reject the louder option, and each rejected option was louder
in the same way: it **editorialises**. The affordance-as-value sells the next
action; the persistent bar asserts importance it has not earned; the filled band
converts a comparison into a recommendation.

> **The surface reports. It does not editorialise.**

This is a candidate for the top of the rules layer at P2.3 — not because it is
checkable itself, but because it explains why the checkable rules point the way
they do, and an agent given the principle plus the checks will extrapolate
correctly to cases the checks do not cover.

---

## Part 3 — The right-hand pane: a split field

**Decision: seed screen 1 stays three-region.** `Agent/Work-surface pane` is
re-anchored off Manus.

### Anchors

| Role | Reference | What it shows |
|---|---|---|
| **Primary** | [Lindy browser/terminal](https://mobbin.com/screens/9f4affd5-f387-4149-860e-95c83f9bbba5) · [three-tab variant](https://mobbin.com/screens/ce001bd6-2266-4137-8eaf-4c25ab35f624) | Right pane with Browser / Terminal / Website tabs, close control, live output |
| Secondary | [ChatGPT](https://mobbin.com/screens/73833b79-1dd5-4354-8fc4-a2e99c33a75e) | Right pane with Activity / *N* Sources tabs and a close control |
| Secondary | [Perplexity](https://mobbin.com/screens/b16cbdbd-08e2-4281-b334-19f52585ef1c) | Right rail: Artifacts *N* · Sources · Usage, as collapsed expandable rows |

**Three shipping products carry a right-hand region.** That is a pattern, not an
invention — which resolves the earlier concern that the pane had no reference
support.

### Rules the three agree on

- The pane's **tabs sit top-left, the close control top-right**. All three.
- The pane is **dismissible**. None of the three make it permanent.
- Tab labels carry a **count when the content is countable** ("23 Sources",
  "Artifacts 3").

### Rules they disagree on — and the size finding

Right-region width, measured as a share of viewport:

| Product | nav | chat | right region |
|---|---|---|---|
| ChatGPT | 16% | 57% | **26%** |
| Perplexity | 13% | 61% | **24%** |
| Lindy (live work) | collapsed | 36% | **64%** |

**The right region has two size modes, not one.** At ~25% it is an *index* —
sources, artifacts, usage, things you scan. At ~64% it is a *work surface* —
a terminal or browser you actually read. Lindy collapses the nav entirely when
it opens the wide mode.

> **Extracted rule:** the pane occupies ~25% when it lists references and ~60%+
> when it renders live work. At the wide setting the nav collapses. There is no
> intermediate width.

### The open question — for Phase 3, not settled now

**The field is split, and one significant product has moved the other way.**
Manus shipped three-region and retreated to two-region with artifacts inline.
That is the single strongest piece of evidence against the pattern, because it
is a product that tried it and chose to stop.

So the honest position is:

- Three products currently ship a right-hand region — enough to justify building
  the component and anchoring it properly.
- One product abandoned it — enough that "every agent surface is three-region"
  is **not** a settled rule and must not be written as one.

**Carry to Phase 3 as an open question:** does the agent skill default to
two-region or three-region, and what condition promotes a surface to the wide
mode? Candidate condition, to be tested rather than assumed: *a right pane
appears only when there is live, inspectable work — a terminal, a browser, a
document being edited. Sources and citations alone do not earn a pane; they
belong inline or in a collapsed rail.*

That condition, if it holds, explains both camps at once: Manus removed the pane
because it had nothing live to put in it, and Lindy keeps it because it does.
