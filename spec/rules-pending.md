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

**Status:** proposed
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

### Open questions for P2.3

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

**Status:** open
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

### Proposed self-check (draft, not ready)

```
If a surface can render with zero rows, it declares which of 64 / 65 / 66
applies, and renders that component — never a generic blank, and never
first-run copy on a filtered result.
```

The second clause is the checkable one and the one worth having. The rest waits
on the contracts existing.

---

*Append new entries above this line as they are found. Number sequentially.*
