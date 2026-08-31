# Discovery question regression — v1

Use these cases to judge Ithaca's discovery behaviour. They test decisions,
not exact wording.

## Complete PRD

Given a PRD that defines the user, primary job, information priority, fields,
actions and consequences, permissions, states, scale, responsive priority, and
repository context:

- ask zero questions;
- begin implementation after repository inspection;
- do not request visual preferences or an approval step.

## Thin but buildable request

Given `Build a customer-facing page where clinic managers can review and
resolve failed appointment reminders`:

- ask a compact set of high-impact product questions;
- prefer questions about the resolution workflow, essential record data,
  permissions, important states, scale, and required devices;
- state that unanswered enhancement questions will use reasonable assumptions;
- remain below 10 questions;
- do not ask about cards, tables, colours, spacing, or page layout.

## User supplies partial answers

When the user answers only some enhancement questions:

- do not repeat skipped questions;
- proceed with reasonable assumptions;
- report material assumptions in the handoff.

## True blocker

When a destructive action is required but authorization and recovery behaviour
are undefined:

- identify the precise blocker;
- ask only the required product question;
- wait before implementing that destructive workflow.

## Direct instruction to proceed

When the user says `use your judgment and build it`:

- ask no enhancement questions;
- proceed unless a true permission, destructive-action, data-model, or core
  workflow blocker remains.
