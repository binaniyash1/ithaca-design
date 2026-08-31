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
