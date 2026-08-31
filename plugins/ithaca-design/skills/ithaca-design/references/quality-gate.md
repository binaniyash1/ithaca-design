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
