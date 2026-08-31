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
