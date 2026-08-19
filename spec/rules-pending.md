# rules-pending.md

**Running list of rule gaps found by looking at real output.** Feeds **P2.3**,
where the rules layer gets authored.

Nothing here is a rule yet. Each entry is a place where the system currently
gives an agent something it can interpret rather than something it can fail —
which §6 is blunt about: *a rule that cannot be checked is decoration.*

## How to use this file

- **Append, don't curate.** A gap noticed and not written down is a gap
  rediscovered three phases later at higher cost.
- **Only from real output.** These come from generating something, wincing, and
  working out why. Not from imagining what a system ought to cover.
- **Every entry needs a proposed self-check** — the literal test an agent runs
  before emitting. If a proposal cannot be reduced to a check, it is not ready
  to be a rule and should say so.
- At **P2.3**, each entry resolves into a selection rule, a density rule, a
  refusal rule, or an explicit decision not to make it a rule at all. Record
  which; a gap closed by deciding it doesn't matter is still closed.

**Status values:** `open` · `proposed` (fix drafted, not ratified) · `resolved`
(landed in the spec, with a pointer) · `dropped` (deliberately not a rule, with
the reason).

---

## 001 — "No shadow on a coloured background" has no threshold

**Status:** resolved → [`tokens-v0.md`](tokens-v0.md) (19 Aug 2026)
**Found:** 19 Aug 2026, building the install page (P0.4)
**Kind:** refusal rule — sharpening an existing one
**Blocks:** every component contract that declares a depth strategy

### What happened

The install page shipped a violation of a rule it was itself advertising. The
copy button used `--surface` with a soft shadow; on hover it swapped to
`--accent-wash`, a warm tint, **while keeping the shadow**. A shadow layered on
a coloured background — refusal rule 2, on the page documenting refusal rule 2.

It was caught by auditing the built output, not by reading the intent.

### Why the rule failed to catch it

The rule says "coloured background" and never says where that line sits. The
entire low-density palette is warm-tinted by design — the gradient wash is
load-bearing and explicitly permitted. So on this palette:

| Token | Value | "Coloured"? |
|---|---|---|
| `--surface` | `#fffdfa` | Off-white. Obviously fine |
| `--accent-wash` | `#fbeadd` | ~4% saturation warm tint. **Genuinely ambiguous** |
| `--code-bg` | `#f8f1e8` | Warm neutral. Also ambiguous |
| page gradient | multi-stop warm | Ambiguous, and permitted as atmosphere |

Three of four surfaces sit in a grey zone. I ruled `--accent-wash` counts as
coloured and dropped the shadow, but that was a judgement call made in the
moment — exactly what the rules layer exists to remove. Two people would answer
differently, and so would the same agent twice.

Note the trap: over-correcting into "no tints anywhere" would kill the warm wash,
which §6 explicitly protects. The fix must not achieve checkability by banning
the thing the aesthetic depends on.

### Proposed fix

Invert it from a property test to a token test. **Shadows are permitted only on
a named surface token.**

```
Refusal: a node carrying a shadow must have its fill bound to --surface
         (or a brand's registered equivalent). Any other fill — tint, wash,
         gradient, semantic colour — takes depth from a hairline or from
         nothing.
```

**Self-check:** *is this element's fill `--surface`?* Binary, mechanical,
answerable from the token binding without inspecting a colour value. It also
survives brand overrides untouched, since it tests the role rather than the hex.

### Resolution

`tokens-v0.md` names the surface token, which is what the proposed fix needed:

```
--surface = neutral-0 (#fffdfa)
self-check:  is this element's fill --surface?   yes → shadow allowed
                                                  no  → shadow forbidden
```

Binary, mechanical, answerable from the token binding without inspecting a
colour value, and unaffected by brand overrides since it tests the role rather
than the hex. The per-state requirement is carried into the token file: the
check runs per state, because a fill that changes on hover changes the answer.

High density forbids shadows outright (`shadow-none`, always), so this rule only
ever binds in low density. Stated there so it is not misread as loosening the
high-density prohibition.

Carried forward, not blocking: whether a brand may register more than one
shadow-bearing surface. If so the check becomes "is the fill in the
`shadow-permitted` set" — still binary, but needs a declared set per brand.
Revisit at P2.1 when real tokens land.

### Original open questions (answered above)

- Does a brand get to register more than one shadow-bearing surface? If yes, the
  check becomes "is the fill in the `shadow-permitted` set", which is still
  binary but needs a declared set per brand.
- High density forbids shadows outright, so this rule only ever binds in low
  density. Worth stating explicitly so it is not read as loosening the
  high-density prohibition.
- Hover and active states change fills. The check must run **per state**, not
  once per element — this violation lived entirely in `:hover`. Any
  state-blind check would have passed it.

---

## 002 — Empty states have no stated shape

**Status:** resolved → [`empty-states.md`](empty-states.md) (19 Aug 2026)
**Found:** 19 Aug 2026, building the install page changelog (P0.4)
**Kind:** component contract — three of them — plus a selection rule
**Blocks:** atlas group F (Surfaces and feedback, 56–66). Settle before that build.

### What happened

The changelog needed an empty state. Nothing in the system says what an empty
state is *made of*, so I invented one: title, one explanatory sentence, no call
to action. It reads fine. It is also completely unfounded — a fourth ad-hoc
answer to a question the system has never answered once.

Part E requires empty states. It does not say what they contain.

### Why this is urgent rather than tidy

The atlas already carries **three distinct empty states** as separate P1
components, and is right to:

| # | Component | Distinction that matters |
|---|---|---|
| 64 | Empty state — first run | Never had data. Needs guidance and one action. Colour permitted |
| 65 | Empty state — filtered | Had data, the filter excluded it. Needs a **clear-filter** action, not a create action |
| 66 | Error / failed to load | Must look **distinct** from empty. Needs a retry affordance |

The atlas notes on 65 that most systems conflate first-run and filtered, and
that it is a real bug. That conflation is exactly what happens by default when
three components have no contract distinguishing them — an agent reaches for
whichever it saw last. Three components with one implicit shape is worse than
one component, because it looks like coverage.

Reference 64 has real anchors already (Tally, Typeform, both single primary CTA,
no secondary). 65 and 66 are marked `pending`.

### What needs settling

A shared skeleton, then per-variant divergence:

- **Slots and their order** — illustration or icon? headline? body? primary
  action? secondary action? Is any of them optional, and when?
- **Action count.** Both 64 references use one primary and no secondary. Is that
  the rule, or an artefact of two samples? A refusal is available here — *empty
  states carry at most one action* — but it needs more than two data points.
- **Which slots differ per variant.** 65 needs the triggering filter echoed back
  or the clear-action is meaningless. 66 needs the failure surfaced without
  dumping a stack trace.
- **How 66 reads as distinct from 64 and 65** without reaching for `--danger`,
  since a failed load is not a destructive action and semantic colour is
  reserved for real status meaning.
- **Density behaviour.** An empty state inside a dense table is not a full-page
  empty state. Same component with a density variant, or two components?
- **Where the scoped colour permission applies.** §6 permits bolder colour in
  empty states — but plausibly only for first-run, not for a failed load. Needs
  saying, or it leaks.

### Resolution

Landed as three separate component contracts in
[`empty-states.md`](empty-states.md), with a strict selection order
(66 → 65 → 64), eight self-checks, and per-component prohibitions.

Answers to the open questions above, as settled:

- **Action count** — exactly one button, all three. No secondary, ever. The two
  reference samples turned out to be right; the rule is enforced as a refusal
  rather than a preference.
- **66 vs 64/65 distinctness without `danger`** — carried by *structure*:
  66 renders in a bordered container, 64 and 65 never do. Binary, and it avoids
  making a network blip look like data loss.
- **Colour permission leakage** — scoped permission applies to **64 only**.
  Explicitly withdrawn for 65 (noise inside working chrome) and 66 (and
  `danger` is banned there outright).
- **Density** — all three appear in both modes. The only per-mode divergence is
  the illustration, permitted in 64 low-density and nowhere else.
- **Slots** — one shared skeleton, permitted slots declared per component.
- **Copy ceilings** — 6 words / 120 chars for 64; 5 words / 90 chars for 65
  and 66, with 65 required to name the active filter.

### Original proposed self-check (superseded)

```
If a surface can render with zero rows, it declares which of 64 / 65 / 66
applies, and renders that component — never a generic blank, and never
first-run copy on a filtered result.
```

The second clause is the checkable one and the one worth having. The rest waits
on the contracts existing.

---

## 003 — "One button, no secondary" rests on two samples

**Status:** open — **thin evidence**
**Found:** 19 Aug 2026, authoring the empty-state contracts
**Kind:** refusal rule, already adopted
**Revisit:** P2.3

### What was adopted

[`empty-states.md`](empty-states.md) makes it a hard prohibition across all
three empty states:

> Never more than **one** button. No secondary button, ever.

### The problem with it

**The evidence is two reference screens.** Atlas row 64 cites Tally and
Typeform; both use a single primary CTA with no secondary. That is the entire
basis. Two samples from two products in one category is a coincidence as easily
as a principle, and the rule was adopted anyway because the failure mode of
permitting two buttons — a first-run state where "create" and "import" compete
and neither reads as the path — is worse than the cost of forbidding it.

That reasoning justifies a **default**. It does not justify a **refusal**, and
this was written as a refusal.

Recording it here so the thinness is visible rather than inherited. The risk is
that a rule adopted on two samples hardens into an assumption nobody re-examines,
and by P5 it is load-bearing in fifty contracts.

### What would settle it

- Real cases from the seed screens where an empty state plausibly wants two
  actions — first-run with both "create" and "import" is the obvious candidate.
- Whether the same ceiling holds outside empty states, or whether this is
  actually a broader rule about action count in low-information surfaces.
- If it survives: keep as a refusal and say the evidence is behavioural, not
  observational. If it does not: demote to a selection rule ("prefer one action;
  a second requires a stated reason") and update all three contracts.

**Self-check (unchanged either way):** *does this empty state contain more than
one button?* The check is fine. It is the threshold that is under-evidenced.

---

## 004 — The 44px row ceiling and label wrapping cannot both hold

**Status:** open
**Found:** 19 Aug 2026, building atlas 44 (Metadata list) in group D
**Kind:** refusal rule — scope and conflict
**Blocks:** nothing yet. Will recur in every list-like component with a label column.

### What happened

`Data/Metadata list`, Labels=Long variant, renders rows at **50px** against a
declared ceiling of 44px.

The cause is not carelessness. Component 44's stated hard part is *"label/value
column ratio at long labels"*, and the design decision taken was: **long labels
wrap inside their own column rather than pushing the value column out of
alignment**, because a ragged value column is unreadable. Wrapping to two lines
costs ~16px, which is exactly the overshoot.

The two rules are individually right and jointly unsatisfiable:

- *High density: maximum 44px per row.*
- *Long labels must not break column alignment.*

Something has to give, and the spec does not say what.

### Options, none free

1. **Truncate the label.** Holds the ceiling, but a metadata label truncated at
   ~18 characters is often unidentifiable — "Last contract amendment…" and
   "Last contract renewal…" collide.
2. **Let the row grow.** Readable, breaks the ceiling. If permitted, the rule
   needs to say *which* rows it binds.
3. **Scope the ceiling to tabular rows only.** Likely the real answer. The
   threshold exists so a table shows 12+ rows in a 900px viewport; a metadata
   list is not scanned that way and has no such requirement.

### Why this matters beyond one component

The same collision was hit and resolved differently minutes earlier:
`Agent/Tool-call row` came in at 52px because it stacked the tool name over its
status. There the ceiling was the better master — putting status inline dropped
it to 34px and genuinely improved density. So the ceiling is doing real work and
should not simply be loosened.

The distinction that seems to be emerging: **the ceiling binds rows in a
scannable vertical stack of like items, and does not bind rows in a
label/value reference block.** That is a scoping rule, and it needs writing down
before group F, where surfaces and list items multiply.

**Self-check (once scoped):** *is this row part of a scannable stack of like
items? If yes, height ≤ 44px.*

---

*Append new entries above this line as they are found. Number sequentially.*
