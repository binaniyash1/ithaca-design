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

> **This contradicts the execution plan.** Seed screen 1 specifies a
> *three-region shell*. Manus 1.6 is **two-region** — nav plus a single centred
> chat column, with artifacts inline in the transcript and no persistent
> right-hand work surface. See Part 3.

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

> **A value slot with no value renders a neutral placeholder. It never renders a
> verb.** The action to fill it lives in the row's hover affordance, in
> click-to-edit, or in an explicit edit mode — never in the value slot itself.

**Self-check:** does any value slot contain an imperative verb ("Set…", "Add…",
"Assign…")? If yes, it fails.

**Consequences, both real:**

1. **Atlas row 45 is now wrong.** Its stated hard part is *"Empty state per row —
   'Set priority' as an affordance, not a blank"*. That is the rejected option.
   The row note needs rewriting.
2. **`Data/Property row` State=Empty is built the rejected way** and needs
   rebuilding when the atlas resumes.
3. This diverges from Linear, the anchor reference for seed screen 4. That is
   allowed and expected — references teach rules, and a rule may be *reacting
   against* what a reference does. Worth stating so nobody later "fixes" the
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

## Part 3 — Open, for the seed screens

**Seed screen 1's three-region shell is not what Manus does.** Manus 1.6 is
two-region. Either:

1. Redefine seed screen 1 as two-region and let the work surface be inline
   artifacts — matches the reference, loses the split-pane component coverage
   that screen was chosen to force; or
2. Keep three regions as a deliberate divergence, and record that
   `Agent/Work-surface pane` has **no reference support** and is being invented.

Option 2 is defensible — the atlas already notes the agent group has the
thinnest references anywhere — but it must be a decision, not an accident.
Needs settling before Phase 1 designing begins.
