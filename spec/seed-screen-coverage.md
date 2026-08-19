# seed-screen-coverage.md

**P1.2 — coverage audit of the five seed screens**, measured against the 100
components in `component-atlas.md`. Numbers are counted, not estimated.

Screen 1's anchor is **Lindy**, not Manus, per the P1.1 re-anchor.

---

## Headline

**94 of 100 components are forced into existence. Only 2 P1 components are
missed.** The five are a strong set. Two structural problems, both fixable
without changing the anchors.

| Screen | Components forced | **Unique** (no other screen forces it) |
|---|---|---|
| S1 agent chat | 31 | 13 |
| S2 dense dashboard | 33 | 8 |
| S3 data table | 29 | 9 |
| **S4 record detail + settings** | **40** | **20** |
| S5 commerce landing | 14 | 8 |

---

## 1. What each screen forces

**S1 — Agent chat with work surface** (31)
Shell 24, 25, 26, 27, 32 · agent set 80–91 in full · tabs 31 · modal 67 · sheet
header 74 · first-run empty 64 · failed-to-load 66 · skeleton 23 · textarea 5 ·
file dropzone 14 · dropdown 71 · status pill 16 · avatar 18 · tooltip 20 ·
button 1, 2

**S2 — Dense dashboard** (33)
Hairline panel 57 · metric tile 58 · charts 75, 76, 77, 78, 79 · table core 34,
35, 36, 38, 39 · filter bar 51 · filter chip 52 · date range 13 · badge/pill/tag
15, 16, 17 · callout 61 · page banner 62 · empties 64, 65, 66 · shell 24–28, 30

**S3 — Data table with bulk actions** (29)
Table core 34–43 in full · checkbox 9 · bulk toolbar 55 · search 49, 50 ·
filtering 51, 52, 53, 54 · filtered-empty 65 · toast 72 · dropdown 71 · shell

**S4 — Record detail and settings** (40)
Detail set 44, 45, 46, 47 · inline edit 40 · **the entire form surface: 4, 5, 6,
7, 8, 9, 10, 11, 12, 13, 14, 92, 93, 94, 95** · destructive confirm 68 · modal
67 · drawer 69 · callout 61 · toast 72 · tabs 31 · breadcrumb 29 · avatar group
19 · keyboard key 21 · accordion 60

**S5 — Commerce landing** (14)
Hero 96 · section wrapper 99 · pricing card 97 · pricing rail 98 · promo banner
62 · footer 100 · FAQ accordion 60 · card 56 · divider with label 63 · progress
22 · badge 15 · pill 16 · top bar 28 · button 1

---

## 2. Overlap — and where the premise is wrong

**Overlap is not automatically waste.** Pairwise, excluding app chrome:

| | S1 | S2 | S3 | S4 | S5 |
|---|---|---|---|---|---|
| **S1** | — | 7 | 1 | 8 | 1 |
| **S2** | 7 | — | **9** | 5 | 3 |
| **S3** | 1 | 9 | — | 3 | 0 |
| **S4** | 8 | 5 | 3 | — | 1 |
| **S5** | 1 | 3 | 0 | 1 | — |

**App shell (24), sidebar nav (25), nav item (27), top bar (28) appear in four
screens each. That is the opposite of waste.** A shell used once is a shell you
have not tested. Four different content types — a chat transcript, a panel grid,
a working table, a detail rail — is precisely how you find out the shell has to
flex. Keep it.

**The real redundancy is S2 ∩ S3 = 9 non-chrome components**, the largest in the
set: table 34, table row 35, sortable header 36, status cell 38, avatar cell 39,
filter bar 51, filter chip 52, filtered-empty 65, dropdown 71. Both screens are
anchored to the same product.

This one is defensible but only just. A *read-only ranked table* inside a
dashboard panel and an *interactive working table* with selection and bulk
actions place genuinely different demands on the same components — density,
row affordances, whether the header is sortable at all. Keeping both is
justified. Anchoring both to Peec is not: **re-anchor S3 to a different product**
so the table primitives are stress-tested against two design opinions rather
than one.

---

## 3. Missing entirely

Six of 100. **Only two are P1:**

| # | Component | Tier | Verdict |
|---|---|---|---|
| 59 | **List item** | **P1** | **Real gap.** Genuinely uncovered — 89 (file list item) and 47 (sub-item) are both specialised. Cheap fix: the dashboard's "top domains" list, or the agent file modal |
| 70 | **Popover** | **P1** | **Arguably already covered** — S3's column visibility control (37) is defined as "reorder plus show/hide in one popover". Make that explicit rather than adding a screen |
| 3 | Segmented control | P2 | Defer |
| 33 | Command palette | P2 | **Judgement call.** Defer is defensible, but S4 is anchored to Linear and the command palette is the single most Linear thing there is. Omitting it from a Linear-anchored system is a choice worth making consciously |
| 48 | Kanban column | P3 | Defer |
| 73 | Hover preview card | P3 | Defer |

So the honest count of real gaps is **one** (#59), plus one bookkeeping fix
(#70) and one deliberate omission to confirm (#33).

---

## 4. Is S4 carrying too much? — Yes, measurably

**S4 forces 40 components and carries 20 unique — 2.2× the unique load of any
other screen.** It also carries **15 of 15 form components alone**:

| Screen | Form components carried |
|---|---|
| S4 | **15 of 15** |
| S1 | 2 |
| S2 | 1 |
| S3 | 1 |
| S5 | 0 |

The execution plan already flags this — *"Forms are the thinnest coverage in this
five. Screen 4 has to absorb that load"* — and the count confirms it is worse
than a thin spot. **The form surface is a screen's worth of work being treated as
a subsection of another screen.** In practice one of two things happens: the form
gets designed shallowly to fit alongside the property rail, or S4 takes three
times as long as the others and the states get skipped. Both fail at Gate 1,
which requires every state designed.

### Recommendation — split the form by modality, keep five screens

Do **not** add a sixth screen, and do not merge S2 and S3. Split the form surface
across S3 and S4 by *modality*, because a create drawer and a settings page are
genuinely different design problems, not the same form twice.

**S3 gains a create/edit drawer** — the natural companion to a working table,
and every real table has one:

> drawer 69 · form field wrapper 92 · fieldset 93 · text input 4 · textarea 5 ·
> select 6 · combobox 7 · multi-select with tokens 8 · date range 13 · file
> dropzone 14 · inline validation

**S4 keeps the settings modality** and the detail rail:

> settings row 95 · switch 11 · checkbox 9 · radio group 10 · slider 12 ·
> multi-step wizard 94 · destructive confirm 68 · property rail 45 · metadata 44
> · sub-items 47 · activity 46 · inline edit 40

Result: S4 drops from 40 to roughly 28 and from 20 unique to about 11 — in line
with the others. S3 rises from 29 to about 38, but its unique load stays modest
because the form components are new to it, and it gains a second job that also
justifies re-anchoring it away from Peec.

**Also add #59 List item** to S2 (a "top domains" list is already in the Peec
reference) and **state explicitly that S3's column visibility control is #70
Popover**.

### If you would rather not compress

The alternative is a sixth screen — a dedicated settings-and-form screen. It is
cleaner and it is what the component count actually argues for. It costs a week
against the Phase 1 estimate. Splitting by modality is the recommendation only
because it keeps the schedule and produces two genuinely different form designs
instead of one big one.
