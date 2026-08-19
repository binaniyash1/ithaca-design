# component-atlas.md

**Side artefact for Ithaca Design** — a working base to design against, not part of the shipped system.

**Read this first.** This file is scaffolding for *your* practice. It is deliberately not the spec. Keep the Figma output on a page named `Atlas — scratch`, separate from the seed screens, and never let it become a second source of truth — the canonical source is the text spec. If a component here graduates into the system, it goes through a spec commit, not by being copied out of this page.

**On references.** For primitives, a reference is noise — nobody's checkbox teaches you anything, and the design decisions are all in sizing and state. Marked `primitive` below; use your own judgment and the token scale. References earn their place on composite components where products genuinely diverge. Those are seeded with real links, or marked `pending` for the loop prompt in Part C to fill.

---

## Part A — The 100

Priority tiers: **P1** needed for the five seed screens. **P2** needed for a complete v1. **P3** valuable, defer without guilt.

### A. Inputs and controls (1–14)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 1 | Button | P1 | primitive | Variant × size × state matrix explodes fast. Decide loading behaviour early — width shift on spinner is the classic bug |
| 2 | Icon button | P1 | primitive | Refusal rule 3 means it needs a label or tooltip always. Design the tooltip as part of it |
| 3 | Segmented control | P2 | primitive | Equal-width vs content-width; indicator animation |
| 4 | Text input | P1 | primitive | Prefix, suffix, clear affordance, character count, error message placement without layout shift |
| 5 | Textarea | P1 | primitive | Auto-grow ceiling. Resize handle or not |
| 6 | Select | P1 | primitive | Native vs custom. Long option truncation |
| 7 | Combobox / autocomplete | P2 | [Arcade onboarding](https://mobbin.com/screens/a7045f94-a2a0-4186-82ca-4bef1bbd0d72) | Loading, no-results, and highlighted-match states are usually forgotten |
| 8 | Multi-select with tokens | P2 | pending | Token overflow when 40 are selected. This is the real design problem |
| 9 | Checkbox | P1 | primitive | Indeterminate state — needed for table select-all |
| 10 | Radio group | P1 | [Height preferences](https://mobbin.com/screens/75db6320-fc80-4601-9e4e-f10cf45298f6) | Description text per option; card-style variant |
| 11 | Switch | P1 | [Plain preferences](https://mobbin.com/screens/52c4821b-f900-421a-9709-601e31b77c47) | Pending state while a setting saves. Almost nobody designs this |
| 12 | Slider | P3 | primitive | Value label placement; range variant |
| 13 | Date range picker | P2 | pending | Two-month view, presets, partial selection. Genuinely hard |
| 14 | File dropzone | P2 | pending | Drag-over, uploading with progress, per-file error, mixed success |

### B. Display atoms (15–23)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 15 | Badge | P1 | primitive | Semantic colours only. Refusal rule 6 applies |
| 16 | Status pill | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | With/without dot; which statuses map to which semantic role |
| 17 | Removable tag | P1 | primitive | Remove affordance at small sizes; truncation |
| 18 | Avatar | P1 | primitive | Fallback chain: image → initials → generic. Design all three |
| 19 | Avatar group | P2 | primitive | Overflow count; hover reveal |
| 20 | Tooltip | P1 | primitive | Delay, placement flip near edges, multiline ceiling |
| 21 | Keyboard key | P2 | [Juicebox palette](https://mobbin.com/screens/2af813bf-0129-45d1-81ed-069edee76e16) | Modifier glyphs; combination spacing |
| 22 | Progress bar | P2 | primitive | Indeterminate variant; label position |
| 23 | Skeleton loader | P1 | primitive | Must match the real content's geometry or the swap jolts |

### C. Layout and navigation (24–33)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 24 | App shell | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Where scroll lives. Decide once, obey forever |
| 25 | Sidebar nav | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Collapsed state is a different component, not a narrower one |
| 26 | Nav group with label | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Peec's General/Actions/Project/Company grouping is the pattern to study |
| 27 | Nav item | P1 | [Linear inbox](https://mobbin.com/screens/beb9d6b3-ec34-46d7-9332-320fcb32a338) | Active, hover, badge, nested, icon-only when collapsed |
| 28 | Top bar | P1 | [Manus task view](https://mobbin.com/screens/a6af52d3-15ee-4bb1-88e9-3059b9614c21) | What survives at narrow widths |
| 29 | Breadcrumb | P2 | [Linear detail](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | Middle truncation with a menu |
| 30 | Page header with actions | P1 | [Linear detail](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | Primary/secondary/overflow action hierarchy |
| 31 | Tabs | P1 | [Manus file modal](https://mobbin.com/screens/a6af52d3-15ee-4bb1-88e9-3059b9614c21) | Underline vs pill — pick one per surface type. Overflow scroll |
| 32 | Three-region split | P1 | [Linear inbox](https://mobbin.com/screens/beb9d6b3-ec34-46d7-9332-320fcb32a338) | Which region collapses first as width shrinks |
| 33 | Command palette | P2 | [Juicebox](https://mobbin.com/screens/2af813bf-0129-45d1-81ed-069edee76e16) · [Magnific](https://mobbin.com/screens/14ceb943-f04a-460f-b4f5-2ebd78d74aff) | Grouped results, shortcut column, empty and no-match states. Juicebox's footer hint row is worth copying as a *pattern* |

### D. Data display (34–48)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 34 | Table | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Sticky header, horizontal scroll with a pinned first column |
| 35 | Table row | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Selectable, expandable, hover-reveal actions, 44px ceiling |
| 36 | Sortable column header | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Three-state sort; resize handle |
| 37 | Column visibility control | P2 | pending | Reorder plus show/hide in one popover |
| 38 | Cell — status | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Alignment consistency down the column |
| 39 | Cell — avatar + label | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Truncation point with the avatar fixed |
| 40 | Cell — inline edit | P2 | [Linear detail](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | Read → edit → saving → error, without row height change |
| 41 | Cell — actions menu | P1 | primitive | Hover-only vs always-visible. Keyboard reachability |
| 42 | Row group / collapsible section | P2 | [Height kanban](https://mobbin.com/screens/913e271b-5104-454a-96aa-56b7c255c167) | Count badge, sticky group header |
| 43 | Pagination | P1 | primitive | Page-size control; unknown-total case |
| 44 | Metadata list | P2 | [Twenty task detail](https://mobbin.com/screens/18f1f96e-ff54-4199-ae71-86fd65ddd0f2) | Label/value column ratio at long labels |
| 45 | Property row | P1 | [Linear detail](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | Empty state per row — "Set priority" as an affordance, not a blank |
| 46 | Activity feed item | P1 | [Linear detail](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | System event vs human comment; grouping consecutive events |
| 47 | Sub-item list | P2 | [Linear detail](https://mobbin.com/screens/d0f8ebba-34b7-469c-a708-1069e55a3e02) | Progress count; inline add row |
| 48 | Kanban column | P3 | [Height kanban](https://mobbin.com/screens/913e271b-5104-454a-96aa-56b7c255c167) · [Basecamp](https://mobbin.com/screens/8971f56c-41b3-4360-ae1a-ec05bb2b0b84) | Drop target, drag ghost, empty column, WIP limit |

### E. Filtering, search, views (49–55)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 49 | Search field | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Loading, clear, and result-count states |
| 50 | Search with results dropdown | P2 | pending | Grouped results, recents, keyboard nav, no-match |
| 51 | Filter bar | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Peec's chip row is the model. Overflow when eight filters are applied |
| 52 | Applied filter chip | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Value truncation; multi-value display |
| 53 | Faceted filter panel | P2 | pending | Counts per facet, nested facets, clear-all |
| 54 | Saved view switcher | P3 | [Height kanban](https://mobbin.com/screens/913e271b-5104-454a-96aa-56b7c255c167) | Height's unsaved-changes toast is the interesting half |
| 55 | Bulk action toolbar | P1 | [Peec prompts](https://mobbin.com/screens/e69f99fe-8bac-4633-8803-5eb04c58277b) | Selected count, select-all-across-pages, destructive action placement, how it enters |

### F. Surfaces and feedback (56–66)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 56 | Card | P1 | [Lindy home](https://mobbin.com/screens/1469c839-23d1-48ae-bce5-651fa30e5a34) | Low-density only. Shadow is the depth cue here |
| 57 | Hairline panel | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | High-density only. Header row, action slot, no shadow ever |
| 58 | Metric tile | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Delta indicator, not-yet-computed state, sparkline slot |
| 59 | List item | P1 | [Linear inbox](https://mobbin.com/screens/beb9d6b3-ec34-46d7-9332-320fcb32a338) | Two-line and three-line variants; trailing metadata |
| 60 | Accordion | P1 | [Whop product](https://mobbin.com/screens/c1d2d1d6-5a34-45f9-8359-71ed69d5037a) | Single vs multi-open; icon rotation |
| 61 | Inline callout | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Four semantic variants; dismissible vs persistent |
| 62 | Page banner | P2 | [Whop promo bar](https://mobbin.com/screens/c1d2d1d6-5a34-45f9-8359-71ed69d5037a) | Whop's yellow offer bar. Where colour is allowed to be loud |
| 63 | Divider with label | P3 | primitive | Alignment options |
| 64 | Empty state — first run | P1 | [Tally](https://mobbin.com/screens/0f2523c5-d61e-4384-a934-c169dbb1eaeb) · [Typeform](https://mobbin.com/screens/648d4700-8592-4be4-8b65-5931ac44fd17) | Illustration, one sentence, one action. Note both use a single primary CTA and no secondary. Colour permitted here |
| 65 | Empty state — filtered | P1 | pending | Different component from first-run. Needs a clear-filter action, not a create action. Most systems conflate these and it's a real bug |
| 66 | Error / failed to load | P1 | pending | Must look distinct from empty. Retry affordance |

### G. Overlays (67–74)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 67 | Modal | P1 | [Manus file modal](https://mobbin.com/screens/a6af52d3-15ee-4bb1-88e9-3059b9614c21) | Tab filters inside a modal; scroll inside body only; size variants |
| 68 | Destructive confirm | P1 | pending | Typed confirmation for irreversible actions. Button order |
| 69 | Drawer / sheet | P2 | [FLORA preferences](https://mobbin.com/screens/1df9fe28-4fbc-4c71-9b63-f06c3d9e1967) | Side vs bottom; nested navigation inside |
| 70 | Popover | P1 | primitive | Arrow or not; edge flip; focus trap |
| 71 | Dropdown menu | P1 | [Height view menu](https://mobbin.com/screens/913e271b-5104-454a-96aa-56b7c255c167) | Groups, icons, shortcuts, submenus, checked items, destructive item |
| 72 | Toast | P1 | [Klarna](https://mobbin.com/screens/ab5556c1-f9bd-4e69-92fb-2c9e0b2edda3) | Stacking, auto-dismiss timing, action slot, undo |
| 73 | Hover preview card | P3 | pending | Delay; loading inside the card |
| 74 | Sheet header with close | P2 | [FLORA preferences](https://mobbin.com/screens/1df9fe28-4fbc-4c71-9b63-f06c3d9e1967) | Title, subtitle, close placement consistency |

### H. Charts (75–79)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 75 | Line chart panel | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Multi-series legend, hover crosshair, no-data state |
| 76 | Bar chart panel | P2 | pending | Grouped vs stacked; long category labels |
| 77 | Sparkline | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Legible at tile size with no axes |
| 78 | Distribution bar | P2 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | Peec's domain-type bars. Tiny-segment handling |
| 79 | Chart time-range toggle | P1 | [Peec dashboard](https://mobbin.com/screens/0711fee8-0de2-4f0e-8b7c-16387d22f091) | D/W/M segmented control plus export affordance |

### I. Agent and AI surfaces (80–91)

The differentiated set. Fewest good references anywhere, which is exactly why it's the opportunity.

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 80 | Chat composer | P1 | [Lindy home](https://mobbin.com/screens/1469c839-23d1-48ae-bce5-651fa30e5a34) · [Manus](https://mobbin.com/screens/a6af52d3-15ee-4bb1-88e9-3059b9614c21) | Attachment, mode picker, voice, send. Grows with content, has a ceiling. Disabled-while-running state |
| 81 | User message | P1 | [Lindy chat](https://mobbin.com/screens/9f4affd5-f387-4149-860e-95c83f9bbba5) | Bubble vs no bubble. Edit affordance |
| 82 | Assistant message | P1 | [ChatGPT](https://mobbin.com/screens/b045e2cd-4f54-424a-97f6-4c5954f0c1e1) | Rich text inside: lists, code, tables. Action row on hover |
| 83 | Tool-call row | P1 | [Lindy chat](https://mobbin.com/screens/9f4affd5-f387-4149-860e-95c83f9bbba5) | Lindy's checkmark list is the model. Pending, running, done, failed. Collapsed by default, expandable to output |
| 84 | Reasoning trace | P1 | [ChatGPT activity](https://mobbin.com/screens/b045e2cd-4f54-424a-97f6-4c5954f0c1e1) | Live-streaming vs settled. Collapse after completion |
| 85 | Streaming indicator | P1 | [Lindy chat](https://mobbin.com/screens/9f4affd5-f387-4149-860e-95c83f9bbba5) | Ephemeral status text — Lindy's rotating lines. Must not shift layout |
| 86 | Artifact card | P1 | [Perplexity](https://mobbin.com/screens/b16cbdbd-08e2-4281-b334-19f52585ef1c) | Type icon, title, preview, open action. Generating vs ready |
| 87 | Work-surface pane | P1 | [Lindy browser/terminal](https://mobbin.com/screens/9f4affd5-f387-4149-860e-95c83f9bbba5) | Tabbed panes, close, expand. Empty state before work starts |
| 88 | Source / citation chip | P2 | [Cohere playground](https://mobbin.com/screens/dace5f8f-6695-435f-ae31-0984f2e40dcf) | Inline vs footer. Favicon plus count |
| 89 | File list item | P1 | [Manus file modal](https://mobbin.com/screens/a6af52d3-15ee-4bb1-88e9-3059b9614c21) | Type icon, timestamp, overflow menu, link indicator |
| 90 | Suggested prompt chips | P1 | [Lindy home](https://mobbin.com/screens/1469c839-23d1-48ae-bce5-651fa30e5a34) | Wrapping across rows; icon per chip; "see all" |
| 91 | Run header | P2 | [Perplexity](https://mobbin.com/screens/b16cbdbd-08e2-4281-b334-19f52585ef1c) | Artifacts / sources / usage counters, stop, share |

### J. Forms and flows (92–95)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 92 | Form field wrapper | P1 | [Mercury onboarding](https://mobbin.com/screens/8b12e7b5-4bd6-4eea-9a61-7ebbcfa4f855) | Label, optional marker, help text, error — without layout shift when the error appears |
| 93 | Fieldset / grouped section | P1 | [Plain preferences](https://mobbin.com/screens/52c4821b-f900-421a-9709-601e31b77c47) | Section title, description, spacing rhythm between groups |
| 94 | Multi-step wizard | P2 | [Mercury 1/6 sidebar](https://mobbin.com/screens/8b12e7b5-4bd6-4eea-9a61-7ebbcfa4f855) · [Arcade stepper](https://mobbin.com/screens/a7045f94-a2a0-4186-82ca-4bef1bbd0d72) | Two different models — Mercury's vertical sidebar with step states, Arcade's horizontal top stepper. Pick one per context and say which |
| 95 | Settings row | P1 | [Plain](https://mobbin.com/screens/52c4821b-f900-421a-9709-601e31b77c47) · [Height](https://mobbin.com/screens/75db6320-fc80-4601-9e4e-f10cf45298f6) | Label, description, control on the right. Height right-aligns labels; Plain left-aligns. Decide |

### K. Marketing and conversion (96–100)

| # | Component | Tier | Reference | What makes it hard |
|---|---|---|---|---|
| 96 | Hero | P2 | pending | Low-density mode. Gradient wash permitted here |
| 97 | Pricing card | P2 | [Dribbble](https://mobbin.com/screens/e2673c25-796e-4ad9-9e44-c03402f01025) · [Eventbrite](https://mobbin.com/screens/5ffdc596-4ae9-4441-9448-f3ea6fd5755a) | Featured/recommended treatment, annual toggle, feature list, "everything in X plus". Dribbble's is the strongest of the three |
| 98 | Pricing summary rail | P3 | [Sprout Social](https://mobbin.com/screens/0c3b5b63-f4dc-45ae-bc59-e924e561ac2a) | Line items, total, proceed. Useful for checkout too |
| 99 | Section wrapper | P2 | pending | Vertical rhythm between sections; max-width and gutters |
| 100 | Footer | P2 | [Klarna](https://mobbin.com/screens/ab5556c1-f9bd-4e69-92fb-2c9e0b2edda3) | Column groups, responsive collapse, locale switcher |

**Tier counts:** P1 = 52, P2 = 37, P3 = 11. Build P1 first — it covers all five seed screens.

---

## Part B — Two things this list is telling you

**The agent set has the thinnest references of any group, and that is the finding.** For buttons and tables you can look at fifty products. For a tool-call row you can look at maybe four, and none of them agree. Every product ships its own improvisation. That's not a gap in Mobbin — it's a gap in the industry, and it's the strongest argument for building the agent skill first.

**Empty states split into three components, not one.** First-run, filtered-to-nothing, and failed-to-load need different copy, different actions, and different visual weight. Almost every design system ships one "empty state" and then produces screens telling a user to "create your first item" when actually their filter excluded everything. Worth getting right here.

---

## Part C — Prompts

### PR.1 — Fill the remaining references

```
Read component-atlas.md in this repo. Some rows have a reference link; some are
marked "pending"; some are marked "primitive".

For every row marked "pending", search Mobbin and find the two best references.
One search per component — do not batch them into one query.

For each, add to the table:
- Two Mobbin links, best first
- One sentence on the specific checkable rule that reference demonstrates.
  Numbers and conditions, not adjectives

If Mobbin has nothing good for a component, say so explicitly and search the web
instead for a design-system documentation page that covers it well — Radix,
Material, Carbon, Atlassian, Polaris. Link that and mark the row "web".

Skip every row marked "primitive". Do not add references to those.

Work in groups of ten. Show me each group and wait for my go-ahead before
continuing. Commit after each group.
```

### PR.2 — Scaffold the Figma page

```
In Figma file wqs3OgPvp03s0R0wUTzUHj (Gush Design team), create a new page named
"Atlas — scratch".

Build this as a real first draft I can design on top of — properly structured AND
properly styled from our tokens. Not a wireframe.

Read the canonical token spec in this repo first. Every colour, type size,
spacing value, radius, border weight and shadow you apply must come from those
tokens. Do not invent a value. If a component needs something the tokens don't
cover, stop and tell me which token is missing rather than improvising one — that
gap is useful information.

Then read component-atlas.md and build GROUP A (components 1–14) only.

For each component:
- A component set named exactly as in the atlas, in the form "Input/Button"
- Variant properties for every axis in the atlas notes — variant, size, state
- Auto layout with real constraints, not fixed frames
- Styled from the tokens, at the correct density mode for that component. Get the
  type sizes, border weights and spacing right — I need to be able to judge
  rhythm and hierarchy, which is impossible in placeholder grey
- A text label above each set showing its number and name from the atlas
- Below each set, a text note listing the states the atlas says are hard, so I
  see the requirement while designing

Obey the refusal rules exactly as the real skill will: maximum 2 font weights,
one decorative accent, no shadows in high-density mode, no shadow on a coloured
background, one radius scale per surface, no centred body text, no icon-only
button without a label.

Lay the group out in a single column with 200px between component sets. Light
mode only.

When done, report two things: what you could not express in Figma, and which
tokens you found missing or ambiguous. Then stop — I will review before you
continue to the next group.
```

Repeat per group. Eleven groups, A through K.

### PR.3 — State expansion

```
For the component sets already on the "Atlas — scratch" page in Figma file
wqs3OgPvp03s0R0wUTzUHj, expand the state coverage.

Read the state matrix in execution-plan.md Part E. For each component set, add
any missing state as a variant — including the ones people skip: partial data,
overflow and truncation, permission denied, stale, failed to load.

For every state you add, place a realistic worst-case content example inside it,
not lorem ipsum. A 340-character company name. Forty tags on one row. A metric
that hasn't computed. An unresolved value.

Report which components broke visually when you put worst-case content in them.
That list is more useful to me than the components themselves.
```

### PR.4 — Audit

```
Audit the "Atlas — scratch" page in Figma file wqs3OgPvp03s0R0wUTzUHj against
component-atlas.md.

Report:
1. Components in the atlas with no component set on the page
2. Component sets on the page not in the atlas
3. Component sets missing a variant axis the atlas requires
4. Naming inconsistencies against the "Category/Name" convention
5. Any component set using fixed frames instead of auto layout
6. Any colour, type size, spacing value, radius or shadow that is not a token —
   list the offending value and the component it appears in
7. Any refusal-rule violation on the page

Output as a checklist. Do not fix anything yet — I want to see the gap first.
```

### PR.5 — Graduation

Run only when a component is ready to enter the real system.

```
The following components on the "Atlas — scratch" page are ready to graduate into
the Ithaca system: [names].

For each, author its component contract in the canonical text spec, following the
format established in Phase 2. Derive the contract from what I actually designed
in Figma, not from the atlas notes — the design is now ahead of the notes.

Then flag any conflict between what I designed and an existing refusal rule or
selection rule. Do not silently reconcile. If my design breaks a rule, I need to
decide whether the design or the rule is wrong.

Do not delete anything from the scratch page. It stays as a sketchbook.
```

---

## Part D — Suggested order

**Dependency: PR.2 needs tokens.** It styles from the canonical token spec, so run it after P2.1 in the execution plan. If you run it earlier there's nothing to style from and you'll get exactly the grey wireframe this file no longer asks for. If you want to start the atlas before tokens exist, do PR.1 only.

1. **PR.1** on the pending rows — cheap, no dependency, and it front-loads the looking-at-things work that actually builds judgment
2. **PR.2** on group I (agent surfaces, 80–91) first, not group A. It's the differentiated set, the references are thinnest, and it's where you'll learn the most
3. **PR.2** on groups D, E, F next — the table, filtering and surface components carry three of the five seed screens
4. **PR.3** once two or three groups are scaffolded, since worst-case content is where the design decisions actually live
5. **PR.4** weekly
6. **PR.5** only when something is genuinely settled

**Separate project or same repo?** Same repo, separate page and separate file. The atlas benefits from sitting next to the spec — PR.5 needs to read both — but it must never be mistaken for the spec. Committing it alongside with a clear name does that; a separate project makes the graduation step harder for no gain.
