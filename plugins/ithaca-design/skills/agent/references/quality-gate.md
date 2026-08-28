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

## States and content

- Are every PRD-named state and relevant system state implemented?
- Are first-run, filtered-empty, all-clear, and error states distinct?
- Does realistic content stress long names, values, labels, and metadata?
- Do loading and validation changes avoid layout shift?

## Interaction and accessibility

- Can keyboard users reach and operate every control?
- Is focus visible and is every icon-only control named?
- Are touch targets adequate where touch input applies?
- Does reduced motion preserve the final result and information?
- Are inline and destructive actions explicit and recoverable where possible?

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
