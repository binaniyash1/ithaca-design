---
name: ithaca-design
description: Generate production-ready product UI from a PRD or plain-language requirement using Ithaca's design rules, components, and quality checks. Use when someone asks a coding agent to build or implement a screen, page, dashboard, settings view, form, data table, modal, chat or agent workspace, or responsive product interface. Do not use for backend-only work, copywriting, or a UI review that does not request implementation.
---

# Ithaca — product UI generation

Build the requested interface in the user's existing repository. The normal
input is a PRD; never require the user to translate it into design language.

At the start of the first response, state: `Using Ithaca Design v0.5.0.` This
makes stale skill or plugin installations visible before work begins.

## Required workflow

For every implementation request, read and follow
[Generate product UI from a PRD](#generate-product-ui-from-a-prd).

Then read:

- [Ithaca foundations](#ithaca-foundations) for the governing
  visual rules and density decision;
- [Interaction and controls](#interaction-and-controls) for
  selection, hover, menus, click targets, and feedback behavior;
- [Quality gate](#quality-gate) before claiming the
  work is complete;
- [Operational workspace](#operational-workspace)
  when the PRD describes a dashboard, CRM, queue, table, pipeline, orders,
  accounts, reports, settings, or another operational product surface.
- [Charts and progress visualisation](#charts-and-progress-visualisation) when the result contains charts,
  progress indicators, pipeline summaries, or data visualisation.

Do not load an unrelated surface reference merely because it exists.

## Source priority

Use implementations in this order:

1. Working components and conventions in the target repository.
2. Gushwork-owned components supplied by the user or Ithaca.
3. Ithaca component contracts and composition patterns.
4. One license-compatible external component when 1–3 cannot meet the need.
5. A new component only when no suitable implementation exists.

External code supplies behavior, not art direction. Replace its palette,
spacing, typography, radius, elevation, density, hierarchy, and motion with
Ithaca's rules.

## User experience

Plan silently and proceed into implementation. Do not insert a design-brief or
wireframe approval step unless the user requests one. Ask a question only when
the missing answer would materially change product behavior, data, permissions,
or the core workflow.

Return working, rendered UI—not only a description, wireframe, or Figma file.

<!--
This is the self-contained forwarding build of Ithaca Design. It is generated
from the canonical skill; all referenced guidance is embedded below.
-->

---

# Embedded Ithaca guidance

# Generate product UI from a PRD

Use this workflow when the user supplies a PRD or a plain-language product
requirement and expects working UI.

## User contract

The normal input is the PRD. Do not require a separate design brief,
wireframe, component list, or visual specification.

Do not stop for approval after planning. Ask a question only when a missing
answer would materially change the product, data model, permissions, or core
workflow. Infer ordinary visual decisions from Ithaca.

## Internal workflow

1. Read the complete PRD and identify the primary user, job, information
   hierarchy, actions, data, and required states.
2. Inspect the target repository before choosing an implementation. Identify
   its framework, routes, existing components, tokens, dependencies, and local
   conventions. Preserve working functionality.
3. Classify the requested surface and density. Choose one clear focal region,
   then select existing project or Gushwork components before considering an
   external source.
4. Build production UI in the target repository. Include realistic content and
   every state needed to understand and operate the feature.
5. Run the relevant checks and start a preview. Capture the rendered result at
   the required responsive sizes.
6. Critique the rendered UI against Ithaca's rules and the PRD. Correct visual
   hierarchy, density, spacing, overflow, state, accessibility, and responsive
   failures before returning it.
7. Report what was built, important assumptions, verification performed, and
   any unresolved product risk. Do not make the user read the internal design
   brief unless they ask for it.

## Completion threshold

Working code alone is not completion. The result must be rendered and reviewed.
If the environment prevents preview or visual inspection, state that limitation
explicitly and do not claim visual validation.

Do not produce a Figma-only answer when the request is to build a product. Code
is primary; Figma or another editable artifact is optional output when requested.

---

# Ithaca foundations

## Start with the task

Convert the PRD into jobs, hierarchy, actions, data, and states before choosing
visual structure. One screen has one dominant question and one focal region.
Do not turn every feature into a peer card.

## Density

Choose one mode for each surface.

### High density

Use for dashboards, queues, tables, settings, CRM, reporting, and operational
workspaces.

- Canvas and navigation use a quiet neutral near `#FAFAFA`.
- White surfaces mark meaningful decision boundaries, not every component.
- Prefer shared containers, dividers, and hairlines over nested cards.
- No shadows.
- Rows are no taller than 44px unless multiline content is essential.
- Keep controls compact but preserve accessible hit areas.
- Gradients are not decoration in dense information regions.

### Low density

Use for agent workspaces, onboarding, empty states, marketing, and a single
immersive task.

- A white focal surface may use one subtle shadow.
- A restrained neutral-to-brand gradient may provide atmosphere.
- The gradient must not sit behind dense data, tables, settings, or long text.
- Use generous negative space and a low element count.
- One signature visual or motion effect is enough.

## Colour and emphasis

- Use one primary brand colour rationally for primary actions, selection, and
  true focus. Do not scatter it across chrome.
- Semantic colours represent real success, warning, danger, or information.
- Filled primary buttons have no shadow.
- White secondary controls use a neutral border and subtle `shadow-sm` only in
  low-density mode; high-density controls use borders without shadow.
- When metrics are expressed as separate cards, keep the cards white with a
  quiet neutral border, consistent 16px or 20px padding, matched radius, a
  subdued label, a clearly differentiated mono value, and restrained semantic
  support. The number of cards follows the product need, not a visual quota.
- Saturated chart colours belong to data encoding, not surrounding chrome.
- Overdue may be the strongest status emphasis in an operational product, but
  structure and legibility still outrank saturation.

## Typography and numbers

- Use at most two font weights on one screen.
- Body text is left aligned.
- Numeric values, timestamps, currency, percentages, counts, and identifiers
  use the registered mono treatment. Prefer Supply when it is available;
  otherwise use a legible open-source monospace with tabular figures.
- Labels stay quiet; values, current state, and the next action carry emphasis.
- Do not use oversized marketing headings inside working product surfaces.

## Spacing and geometry

- Use a consistent spacing scale; sibling cards and rows share padding.
- Default meaningful card padding is 16px or 20px.
- Align navigation and main-area headers on the same horizontal axis.
- Keep the product/brand block in the navigation compact. It should establish
  identity without becoming a second hero; normally keep it around 48–56px or
  roughly 20% shorter than a conventional 64–72px app header.
- Siblings in a comparison set keep identical width, padding, border, radius,
  and internal order. Emphasis changes colour or badge, not structure.
- A white focal surface still needs explicit internal hierarchy. Use grouping,
  headings, aligned lanes, and semantic spacing so the surface does not become
  an undifferentiated white container.
- Reserve geometry for in-flow loading, validation, and hover actions so the
  interface does not jump.

## Interaction

- Frequently changed values should be editable inline or in the contextual
  peek instead of requiring a full record.
- Action-triggered chrome overlays content and occupies zero height when absent.
- Empty values are neutral placeholders, never imperative verbs.
- Icon-only controls require an accessible name and a visible tooltip; when
  comprehension matters, use a visible label.
- Every interactive target uses the pointer cursor and has visible hover,
  focus-visible, active, and disabled states.
- Hover must preserve hierarchy. Secondary controls, tabs, row actions, and
  neutral navigation use a very light neutral fill, not a brand-colour fill.
- Success, undo, and progress feedback must overlay the layout or occupy
  permanently reserved space. Never insert temporary chrome that shifts the
  page vertically.

## Motion

- Motion must explain state, preserve spatial continuity, or add proportionate
  delight. Otherwise remove it.
- Ordinary UI motion should generally finish below 300ms.
- High-frequency and keyboard-driven actions are instant or nearly instant.
- Enter and exit paths follow the same spatial cause.
- Respect reduced motion without losing state or information.

---

# Interaction and controls

Use these rules on any interactive product surface.

## Click targets and states

- Every clickable element uses `cursor: pointer`: navigation items, tabs,
  accordion headers, selectable rows, buttons, icon buttons, and menu items.
- Provide resting, hover, focus-visible, active, selected, disabled, and loading
  states when relevant. State changes must not alter control dimensions.
- Use a pale neutral hover fill for secondary buttons, row actions, tabs, menu
  triggers, and neutral navigation. A hover state must not promote a secondary
  action into a brand-filled primary action.
- Selected rows use a subtle full-surface brand tint. Avoid skinny coloured
  side rails, detached dots, or other ornamental selection markers unless the
  product already has that established convention.

## Rows with nested actions

- If a row opens detail, make its full non-control area clickable and keyboard
  operable. Do not limit selection to its label or chevron.
- Nested actions such as dismiss, assign, or log call remain separate controls;
  prevent their events from also opening the row.
- Reserve the action lane even when icons appear only on hover. Hovering must
  reveal controls without reflowing text or shifting columns.

## Buttons, selects, and menus

- Outlined controls share one quiet neutral border token. Avoid medium or dark
  gray borders that compete with content.
- A menu trigger and its popup should feel related, but the popup may be
  4–8px rounder than the compact trigger. Prefer roughly 8–12px for menus and
  selects unless the host system defines an equivalent radius.
- Menus need comfortable internal spacing, visible hover and focus states, and
  no brand fill for ordinary options.
- Filled brand buttons are reserved for the dominant action. They do not gain a
  shadow; their hover may adjust tone slightly without changing hierarchy.

## Feedback without jitter

- Resolve completed queue items in place when required, but report success via
  a toast, overlay, or already-reserved status region.
- Never prepend a temporary success banner or counter that changes the y-axis
  position of the page header, metrics, queue, or contextual pane.
- If undo is offered, keep it in the overlay feedback and preserve enough time
  for deliberate recovery.

---

# Quality gate

Run this gate after rendering the result and before claiming completion.

## Product

- Can the primary user answer the screen's main question within five seconds?
- Is there exactly one dominant next action or working region?
- Does every action change the correct object and state?
- Are materially ambiguous assumptions reported?

## Visual system

- Is the density mode explicit and consistently applied?
- Do white surfaces mark decision boundaries rather than every nested element?
- Is brand colour restrained and semantic colour truthful?
- Are spacing, padding, radius, borders, and actions consistent among siblings?
- Do numeric values use mono or tabular treatment?
- Are there no shadows in high-density mode?
- Is the navigation brand block compact rather than vertically dominant?
- Do comparable row values occupy stable columns with predictable truncation?
- Does every large white work surface have enough internal grouping and schema
  clarity to avoid becoming an overwhelming undifferentiated container?
- When metrics use cards, are their surface, padding, geometry, mono values,
  labels, and semantic support consistently constructed regardless of count?

## States and content

- Are every PRD-named state and relevant system state implemented?
- Are first-run, filtered-empty, all-clear, and error states distinct?
- Does realistic content stress long names, values, labels, and metadata?
- Do loading and validation changes avoid layout shift?
- Do success notices, undo affordances, and background progress avoid moving
  the primary work surface?

## Interaction and accessibility

- Can keyboard users reach and operate every control?
- Is focus visible and is every icon-only control named?
- Are touch targets adequate where touch input applies?
- Does reduced motion preserve the final result and information?
- Are inline and destructive actions explicit and recoverable where possible?
- Does every clickable element expose a pointer cursor and non-layout-shifting
  hover/focus state?
- Do secondary controls hover neutrally instead of turning into filled primary
  actions?
- Are row and accordion hit areas complete without stealing events from nested
  buttons?
- Do menus and selects use the same quiet border family as buttons and a
  visibly softer radius than compact row controls?
- If a contextual pane depends on selection, is it closed before selection and
  opened by the object that causes it?
- When repeated rows contain many different variables, are their meanings made
  explicit with column labels or another clear reading aid?

## Responsive

- Inspect desktop, tablet, and mobile or the breakpoints the target supports.
- No unintended horizontal page scroll.
- Collapse the least important region first; preserve the primary job and next
  action.
- Do not merely shrink a three-pane desktop composition until it is illegible.

## Evidence

Run the relevant build, type, lint, and test commands. Start the application and
inspect rendered screenshots. If preview or screenshots are unavailable, say
so and mark visual validation incomplete.

Fix failures before returning. Do not turn the gate into a list of caveats the
user must accept.

---

# Operational workspace

Use this reference for CRM, dashboard, queue, table, orders, accounts, reports,
settings, and similar internal or customer-facing operational products.

## Composition

- Use high-density mode.
- The page answers one operational question. Put context and controls in the
  header, then the working surface—not a decorative hero.
- Prefer one continuous work surface with internal grouping over a wall of
  disconnected cards.
- Use a soft neutral canvas and white only for the focal working region or a
  real decision unit.
- Choose the contextual-region activation from the job. When context is
  selection-dependent, start with the region closed and open it from the row or
  object that caused it. Use an ambient region before selection only when its
  information materially changes pre-selection decisions. Once open, keep its
  width and location stable while selection changes; do not cover the primary
  work surface with an unrelated overlay.
- Never exceed three simultaneous panes.

## Queues

- A queue is for resolution, not browsing. Every row has one dominant verb.
- Group rows by the reason they require attention, not by object type alone.
- A successful row action resolves in place and leaves the queue when the PRD
  says the work is complete.
- Bulk action belongs at group level or in an overlay toolbar with a live
  selected count. It must not displace the queue.
- Cards are permitted when spacious scanning is intentional, but use compact
  internal lanes so metadata, status, and action remain aligned.
- When accordion groups represent distinct reasons for action, prefer separate
  bordered group surfaces with a modest gap over one monolithic table. The
  separation should improve scanning without turning the page into a card wall.
- When several comparable work groups coexist, use hierarchical density:
  meaningful space between groups and compact, regular repetition within each
  group. Do not impose this rhythm on an ungrouped surface.
- Expanded accordion content uses a real column grid. Define stable lanes for
  identifier, description, source/status, age/value, hover actions, and primary
  action; do not position each row's content independently.
- Give text lanes explicit minimum and maximum widths and truncate long content
  predictably. Equivalent values such as `2h`, `5h`, and `1d` share one aligned
  column.
- The entire accordion header is clickable. When an item row opens contextual
  detail, the entire non-control portion of the row is clickable as one target;
  nested buttons retain their own actions and must not trigger row selection.
- Resting row actions are outlined/secondary; strengthen them on hover or focus.
  The page-level action remains the only filled primary action.

## Tables

- Use consistent cell padding and column alignment.
- Keep selection, status, owner, numeric value, time, and row actions in stable
  columns.
- Primary identifiers are strongest; metadata and timestamps are quiet.
- Keep important row actions reachable. Do not hide the only useful action in
  an overflow menu.
- Design long labels, empty values, horizontal overflow, sticky headers,
  selection, inline editing, loading, and failed rows.
- Use a pale full-row selection fill with sufficient contrast. Do not use a
  decorative 1–3px brand-colour rail as the primary selection indicator; it is
  visually noisy and reads as generic generated UI.
- Reserve every column across all rows, including absent values and hover-only
  controls, so content never drifts horizontally between records.
- When a repeated row carries many heterogeneous variables, add visible column
  labels or an equally explicit reading aid. Simple rows with self-evident
  content do not require a header merely to resemble a table.

## Metrics and charts

- A stat band may be more appropriate than four independent cards when the
  values describe one shared situation.
- Separate metric cards are equally valid when their hierarchy and styling
  benefit comprehension. Do not choose a fixed card count; judge consistent
  geometry, padding, mono values, label contrast, and semantic support.
- Charts are dense and deliberately bounded; do not spread sparse data across
  the viewport for drama.
- Use modern restrained gradients inside marks only when they aid grouping or
  focus.
- Use a dark tooltip on a light interface.
- Put legends in a separated footer or a stable side region when space allows.
- Put contextual numbers near the chart but do not repeat the same metric in
  several competing cards.

## Contextual peek

- Peek handles the common task: understand context, change status/owner, log an
  action, or inspect a small trail.
- Full record handles history, related objects, notes, people, and uncommon
  edits.
- Every peek exposes exactly one `Open full record` escalation.
- When the pane is selection-triggered, it begins closed and opens as a direct
  consequence of selecting the record. Do not populate it with ambient filler.
- When ambient context is genuinely useful before selection, selection may swap
  ambient context for record context without moving the main work surface.

## Required state families

Choose only those relevant to the PRD, but never omit a named state:

- full/default data;
- partially completed or updated;
- all clear / zero work;
- first-run / no data;
- filtered to nothing;
- loading and progressive work;
- failure and partial failure;
- unowned or unassigned;
- disabled or permission-limited;
- long content and narrow viewport.

First-run, filtered-empty, and failed-to-load are different components. Do not
reuse setup copy for a successful empty queue or a network failure.

---

# Charts and progress visualisation

Use chart styling to make comparison easier, not to decorate a dashboard.

## Shared construction

- Keep charts bounded inside a deliberate focal surface. Give the plotting area
  enough breathing room for labels and comparison, while keeping sparse data
  visually dense.
- Use mono numerals for headline metrics, axes, data labels, percentages,
  currency, and tabular summaries.
- Separate metric headers, plot, and legend or summary table into clear zones.
  Align repeated values into columns rather than floating labels around marks.
- Use pale neutral tracks and grid lines. Saturated colour belongs to the data,
  not the card border or surrounding chrome.
- On light interfaces, use a dark tooltip with high-contrast text.

## Segmented pipeline/progress recipe

Use this recipe when a pipeline is made of meaningful stages or contributions:

- Render one horizontal track per compared category or threshold.
- Encode stages as contiguous segments using a restrained multi-colour palette,
  such as blue, violet, orange-red, and amber. Keep the same stage-to-colour
  mapping across every track.
- Keep the empty remainder a very light neutral. Show a target or benchmark as
  a narrow dark tick rather than another filled segment.
- Use consistent track thickness, generous vertical separation, and aligned
  row labels. Do not compress the tracks into hairlines.
- Place the stage legend or aligned numeric breakdown below the plot or in a
  stable side region. Never force users to infer segment meaning from colour
  alone.
- Colour may have a restrained same-hue glow inside a low-density chart card,
  but high-density operational charts remain flat and shadowless.

## Avoid

- Identical gray bars for meaningfully different pipeline stages.
- A single brand-blue progress fill when the question requires stage
  composition rather than simple completion.
- Oversized plots with little data, legends floating unpredictably, redundant
  metric cards, or gradients that reduce value legibility.
