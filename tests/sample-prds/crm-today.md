# CRM Today — vertical-slice PRD

## User and job

An SMB owner or sales representative opens Today to answer “what should I do
right now?” in under five seconds. This is a queue that empties, not a report or
browsing surface.

## Shell

- Labelled navigation: Today, Pipeline, Orders, Accounts, Reports, Outreach.
- Settings sits in the sidebar footer.
- Main working area plus a fixed 376px right context slot.
- With no selection, the right slot shows ambient month, pipeline, and team
  context. Selecting a row swaps the slot to a record peek without overlaying or
  moving the queue.
- Never show more than three panes.

## Screen

- Date and pace sentence: “13 things want you today. 3 working days left in the
  month.”
- One shared stat band: closed this month, against target, open pipeline, still
  to invoice. Do not render four disconnected KPI cards.
- Rule-generated work groups. Every row has exactly one dominant verb.

| Group | Rule | Row action |
|---|---|---|
| Nobody owns these | Lead has no owner | Claim |
| Chased nobody in a while | Open deal has no contact in N days | Log call |
| Waiting on you to ship | Confirmed order is not dispatched | Mark dispatched |
| Waiting on you to invoice | Delivered order is not invoiced | Send invoice |
| Money overdue | Invoice is past terms | Chase payment |

## Behavior

- Complete the row action in place; the resolved row leaves the queue.
- Support one group-level bulk action.
- Snooze a row to a date; dismiss it with a reason; reassign it without leaving
  Today.
- Peek any row before acting.
- Collapse a group.
- Manager toggle: my work or the whole team.

## Required states

1. Full morning: all groups populated.
2. Partly cleared: groups shrink and progress is apparent.
3. All clear: confident, earned success—not four empty containers.
4. Brand-new customer: replace the queue with setup prompts for import, form
   connection, and team invitation.

## Visual intent

High-density operational workspace. Soft neutral canvas, restrained blue, one
continuous white working surface, hairline separation, no dashboard shadows,
mono/tabular numeric data, aligned headers, consistent compact rows, and no
decorative gradient behind the queue.
