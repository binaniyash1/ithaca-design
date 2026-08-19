# seed-screen-states.md

**P1.3 — every state to design in Figma, screen by screen.**
Light mode only. Dark values exist in `tokens-v0.md` but are marked unused; do
not design a dark variant of anything here.

Work through it screen by screen. **Gate 1 requires every box ticked, not just
the happy path.** The retro question that matters afterwards is *which states did
you skip and why* — that predicts where the system breaks.

Three rules govern most of these and are worth having open while you work:

- **Empty is three components, not one** — `empty-states.md` 64 first-run,
  65 filtered, 66 failed-to-load. Selection order is strict: 66 → 65 → 64.
- **R1** — an unset value renders a neutral placeholder, never an imperative
  verb, and the row stays fully interactive.
- **R2** — chrome that appears on demand overlays; chrome that is always present
  reserves its space. Never the other way round.

---

## Global — applies to every screen

- [ ] **Focus-visible** on every interactive element, at `border-focus` 2px.
      Design it once, apply everywhere. It is the most-skipped state in any system
- [ ] **Disabled vs read-only are different.** Disabled = you may not.
      Read-only = you may not *here*. Do not draw them the same
- [ ] **Loading is not empty.** A surface waiting for data must not render 64
- [ ] **Stale / offline** — data known to be out of date. Needs a banner or
      timestamp treatment that does not look like an error
- [ ] **Permission denied** — the thing exists but is not yours to see. Distinct
      from both empty and failed
- [ ] **Responsive**: desktop 1440 · tablet 1024 · mobile-web 390. Native is out
      of scope
- [ ] **First-run vs returning** — decide per screen whether they differ at all.
      Where they do not, say so rather than leaving it ambiguous

---

## Screen 1 — Agent chat with work surface
*Lindy primary · ChatGPT · Perplexity*

### Data states
- [ ] First run — no conversation yet. Composer, suggested prompt chips, no transcript
- [ ] Returning — conversation history in the sidebar, transcript restored on open
- [ ] Mid-run — assistant streaming, composer disabled, run tracker live
- [ ] Run complete — tracker settled, actions available
- [ ] Run failed — the request died mid-way. Partial transcript must survive
- [ ] Run stopped by user — distinct from failed. Nothing went wrong
- [ ] Work-surface pane **closed** (two-region) and **open** at both widths —
      ~25% index and ~60%+ live work with the nav collapsed
- [ ] Work-surface pane first-run — open but nothing has run yet (64)
- [ ] File modal: populated · filtered to nothing (65) · failed to load (66)
- [ ] Tool-call rows: queued · running · done · failed, and a stack mixing all four
- [ ] Reasoning trace: streaming · settled · collapsed
- [ ] Artifact card: generating · ready · failed

### Ugly data — be specific
- [ ] **A user message with no response yet** — sent, nothing back, no error.
      The most common real state and the easiest to forget
- [ ] **A single-character message** (`k`) next to a 400-word one. Bubble minimum
      width must not look broken
- [ ] **A 900-word assistant answer** with no headings — does the transcript
      still have rhythm, or is it a wall?
- [ ] **A tool call that runs for 4 minutes** — the duration field designed for
      `1.2s` now reads `4m 12s`
- [ ] **Forty tool calls in one turn.** Does the group header collapse them, and
      does the transcript still scroll usefully?
- [ ] **A filename of 120 characters** in the file list — middle-truncation is the
      atlas's stated hard part and cannot be faked
- [ ] **A code block 200 characters wide** with no spaces. Horizontal scroll
      inside the block only; the transcript must not scroll sideways
- [ ] **An artifact that generated an empty file** — ready, but zero rows
- [ ] **A citation chip with a 60-character domain**
- [ ] **Reasoning trace with a single line** — the panel looks broken at n=1

### Interaction
- [ ] Composer: default · focused · filled · disabled-while-running · at its
      growth ceiling with internal scroll
- [ ] Message hover — action row appears **in flow, so its height is reserved**
- [ ] Pane tab overflow — four or more tabs

---

## Screen 2 — Dense dashboard
*Peec AI*

### Data states
- [ ] First run — connected, no data collected yet (64). Not the same as broken
- [ ] Returning — full data, the normal case
- [ ] Loading — panels skeletonised. **Panels must hold their final height** or
      the grid reflows as each resolves
- [ ] Partial — some panels resolved, others still loading, one failed. All three
      on screen at once. This is the real state and it is usually never designed
- [ ] Filtered to nothing (65) — with the active filter named
- [ ] A single panel failed while the rest succeeded (66), scoped to the panel
- [ ] Stale — "last updated 3 hours ago" when it should be minutes
- [ ] Permission denied on one panel only — the rest of the dashboard still works
- [ ] Ranked table with a single row; with exactly the number that fits; with more
- [ ] **List item** (top-domains list) — populated, single item, overflowing

### Ugly data — be specific
- [ ] **A metric that has not computed** — renders `--` per R1, never `0`, never
      blank. `0` is a lie and blank looks broken
- [ ] **A metric that is legitimately 0%** sitting next to one that is `--`.
      They must be visibly different
- [ ] **A negative delta on every tile at once** — an all-red dashboard should not
      look like an error state
- [ ] **A 340-character brand name** in the ranked table
- [ ] **A domain with no favicon** in the top-domains list
- [ ] **Percentages that sum to 103%** from rounding — the distribution bar must
      not overflow its track
- [ ] **A sparkline with two data points**, and one with a single flat line
- [ ] **A sparkline where every value is identical** — a dead-flat line that must
      not read as a rendering failure
- [ ] **Nine categories in a distribution bar** where the design assumed five

### Interaction
- [ ] Filter chip row: none applied · one · six (wrapping)
- [ ] Time-range toggle: each option selected
- [ ] Panel header action hover

---

## Screen 3 — Data table with bulk actions and create/edit drawer
*ClickUp*

### Data states — table
- [ ] First run — no records ever created (64), with one create action
- [ ] Returning — populated
- [ ] Loading — skeleton rows at the correct row height
- [ ] Filtered to nothing (65) — names the filter, offers clear
- [ ] Failed to load (66) — bordered container per the contract, retry available
- [ ] Partial — rows present, one column still computing
- [ ] Single row. Two rows. Exactly one page. One row over a page boundary
- [ ] Selection: none · one · several · all on page · all matching across pages
- [ ] Bulk bar per **R2 — it overlays and occupies zero height when nothing is
      selected**. Do not reserve space for it
- [ ] Bulk action in progress, and partially failed — "3 of 5 archived"
- [ ] Permission denied on some rows — selectable but not actionable
- [ ] Pagination: known total · **unknown total** · single page (does it hide?)

### Data states — create/edit drawer
- [ ] Create, empty
- [ ] Edit, prefilled
- [ ] Every input in: default · focused · filled · disabled · read-only · error
- [ ] Field-level validation error, and a **summary of multiple errors**
- [ ] Saving in progress — the drawer must not resize
- [ ] Save failed, values preserved. Losing the user's input is the worst outcome
- [ ] Unsaved-changes warning on dismiss
- [ ] Combobox: loading · no results · one result · many
- [ ] Multi-select: empty · three tokens · fifteen tokens (wrapping)
- [ ] File dropzone: idle · drag-over · uploading · uploaded · rejected type

### Ugly data — be specific
- [ ] **A 340-character company name** in the name column
- [ ] **Forty tags on one row** — wrap, truncate with `+34`, or scroll? Pick and design it
- [ ] **A row where every optional column is empty** — a row of `--` that must
      still look deliberate and stay clickable (R1)
- [ ] **A name that is a single emoji**
- [ ] **Right-to-left text in one cell** while the rest is left-to-right
- [ ] **A 200-character validation error message**
- [ ] **A combobox option list of 5,000 items**
- [ ] **A date range spanning three years**, and one where end precedes start
- [ ] **A value containing `<script>`** — must render as text, and the design
      must not assume short safe strings

### Interaction
- [ ] Column visibility **popover** (#70): closed · open · reordering · pinned
      column that cannot be hidden
- [ ] Sortable header: unsorted · ascending · descending · mid-resize
- [ ] Row hover with actions revealed — **in flow, space reserved**
- [ ] Sidebar filter tree: collapsed · expanded · counts at zero

---

## Screen 4 — Record detail and settings
*Linear*

### Data states — detail
- [ ] Fully populated
- [ ] **Every property unset** — a rail of placeholders that must not look broken
      or inert (R1, all three self-checks)
- [ ] Some set, some unset — the realistic case
- [ ] Sub-items: none (64) · one · `0/4` · `4/4` complete · a failed sub-item
- [ ] Activity: empty · one event · system events only · mixed system and human ·
      **consecutive system events grouped**
- [ ] Comment composer: idle · focused · sending · send failed with text preserved
- [ ] Stale — the record changed under you while open
- [ ] Permission denied — visible but not editable. **Read-only, not disabled**
- [ ] Deleted while open — the hardest state and the one always skipped

### Data states — settings
- [ ] Each settings row: default · changed-unsaved · saving · saved · failed
- [ ] A setting disabled because a dependency is off — with the reason stated
- [ ] Destructive confirm: idle · type-to-confirm incomplete · confirmed · failed
- [ ] Multi-step wizard: step 1 of N · mid · final · a step failed · resumed
- [ ] Switch, checkbox, radio, slider — all interaction states each

### Ugly data — be specific
- [ ] **A record title of 340 characters** — wraps to how many lines before the
      layout gives up?
- [ ] **A property value longer than the rail is wide** ("Waiting on
      counter-signature from external counsel")
- [ ] **Forty labels on one record**
- [ ] **An activity feed with 400 entries** — is anything paginated or virtualised?
- [ ] **A comment that is one 3,000-character paragraph** with no breaks
- [ ] **A comment containing only an image**, and one containing only whitespace
- [ ] **A sub-item list of 60 items**
- [ ] **A user with no avatar and a 4-word name**
- [ ] **An activity entry from a deleted user** — no name, no avatar, event still real
- [ ] **A timestamp from 2019** next to one from 30 seconds ago

---

## Screen 5 — Commerce landing page
*Whop*

### Data states
- [ ] Full page, all sections
- [ ] Promo banner present · absent (does the hero shift?)
- [ ] Pricing: one plan · two · three · four (does the row wrap or scroll?)
- [ ] A plan with no discount — no savings badge, card must not look unfinished
- [ ] A sold-out or unavailable plan
- [ ] FAQ: all collapsed · one open · all open · a single question
- [ ] Media block: image loaded · loading · **failed to load** · absent
- [ ] Logged-out vs logged-in CTA
- [ ] Currency and locale variation — `$1` vs `€1.234,56` vs `¥1,200`

### Ugly data — be specific
- [ ] **A plan name of 60 characters** ("Enterprise Plus Annual with Priority
      Support") — the atlas's own example, and the card must survive it
- [ ] **A price of `$1,299,000/mo`** — does the number overflow the card?
- [ ] **A free plan at `$0`** beside a paid one — no strikethrough, no savings badge
- [ ] **A feature list of 40 bullets** in one tier while another has 3 — do the
      cards align at the top, the CTA, or not at all? Pick and design it
- [ ] **A FAQ answer of 1,500 characters**
- [ ] **A promo banner with two lines of text** where one was assumed
- [ ] **A hero headline of 140 characters**
- [ ] **A testimonial with no photo and no company**

### Interaction
- [ ] Every CTA: default · hover · focus-visible · active · loading after click
- [ ] Accordion open/close, and keyboard traversal
- [ ] Sticky pricing rail at the point it unsticks near the footer

---

## Counting the job

Roughly **190 distinct states** across five screens, weighted toward 3 and 4.
That is the real size of Phase 1, and it is why the plan allows two weeks.

If time runs short, the honest order to cut in is:

1. **Never cut** the three empty states, failed-to-load, or any ugly-data case —
   these are what a PM generates first and where the system fails
2. Cut **first-run vs returning** where you have decided they are identical —
   but **record the decision**, because it is a decision and not an omission
3. Cut **responsive tablet** before mobile-web; 1024 is mostly interpolation
4. Cut **motion** states last; they are Phase 2.4's problem anyway

*Order of 2 and 3 revised 19 Aug 2026.* Tablet is **derivable later** — with
desktop and mobile-web drawn, 1024 is interpolation and can be reconstructed by
anyone. First-run versus returning is **a product decision that changes what the
screen is for**: whether it teaches or serves. Retrofitting it means revisiting
the screen's purpose, not just its widths, so it is the more expensive thing to
defer even though it looks like the smaller one.

Do not cut permission-denied. It is the state most likely to be discovered in
production by someone who should not have seen something.


---

## Open design questions

**Decide these while drawing, not before.** Each is a question the spec cannot
answer from the outside — the answer only becomes obvious once there is a real
screen with real content in front of you. Record what you chose and why; these
feed **P2.3**, where the rules layer gets authored.

### Q1 — S3 drawer: stacked form or expanding field chips?

ClickUp builds its create form as **field chips** (`Assignee`, `Due date`,
`Priority`, `Tags`) that expand into inputs on click. The conventional
alternative is a **stacked form** — every field visible, labelled, in order.

- Chips keep the drawer short and make the common case fast, but they hide the
  shape of the record and make validation harder to place.
- A stack is honest about what the form contains and gives every field a stable
  home for its error, but it is long, and most fields are usually left untouched.

**What to watch for while drawing:** where the validation error goes in the chip
version. If there is no good answer, that decides it.

### Q2 — S1: does three-region survive being drawn?

Three-region is a **deliberate choice against Manus 1.6**, which shipped it and
retreated to two-region with artifacts inline. Three products still carry a
right-hand region (Lindy, ChatGPT, Perplexity), which is why it stands — but
Manus is the only one that has run the experiment to a conclusion.

**What to watch for:** whether the chat column still feels like the primary
surface at 36% width, and whether the ~25% index mode earns a whole region or is
really a collapsed rail pretending to be a pane. If the index mode looks thin
when drawn, that is evidence for Manus's retreat and the condition proposed in
`reference-rules.md` — *a pane only when there is live, inspectable work* —
becomes the rule rather than a candidate.

### Q3 — does the two-density-mode split hold?

Low density and high density are declared mutually exclusive, and nothing is
allowed to average them. **Watch for anything that sits awkwardly between.**

Known candidates already visible:

- The **S3 create/edit drawer** — an input surface (low-density instinct:
  generous, shadowed) living inside a dense table screen (high-density: hairline,
  flat). Which wins, and does the drawer change mode as it opens?
- **S1's composer** — built low density in the atlas, but it sits under a
  transcript that carries high-density tool-call rows.
- **S5's FAQ accordion** — low density by default, but a 40-item FAQ is a dense
  list by any measure.

If something genuinely sits between, **do not invent a third mode.** Pick a side,
draw it, and log why in `rules-pending.md`. A third density is how two clear
languages become three vague ones.
