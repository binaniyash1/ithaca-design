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
