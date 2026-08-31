# Generate product UI from a PRD

Use this workflow when the user supplies a PRD or a plain-language product
requirement and expects working UI.

## User contract

The normal input is the PRD. Do not require a separate design brief,
wireframe, component list, or visual specification.

Do not stop for approval after planning. Apply the routed discovery gate after
reading the supplied context and repository. Infer ordinary visual decisions
from Ithaca.

## Internal workflow

1. Read the complete PRD and identify the primary user, job, information
   hierarchy, actions, data, and required states.
2. Inspect the target repository before choosing an implementation. Identify
   its framework, routes, existing components, tokens, dependencies, and local
   conventions. Preserve working functionality.
3. Run high-value discovery. If no consequential ambiguity remains, ask no
   questions. Otherwise ask one compact, prioritised batch within the question
   budget, then proceed when required blockers are resolved.
4. Classify the requested surface and density. Choose one clear focal region,
   then select existing project or Gushwork components before considering an
   external source.
5. Build production UI in the target repository. Include realistic content and
   every state needed to understand and operate the feature.
6. Run the relevant checks and start a preview. Capture the rendered result at
   the required responsive sizes.
7. Critique the rendered UI against Ithaca's rules and the PRD. Correct visual
   hierarchy, density, spacing, overflow, state, accessibility, and responsive
   failures before returning it.
8. Report what was built, important assumptions, verification performed, and
   any unresolved product risk. Do not make the user read the internal design
   brief unless they ask for it.

## Completion threshold

Working code alone is not completion. The result must be rendered and reviewed.
If the environment prevents preview or visual inspection, state that limitation
explicitly and do not claim visual validation.

Do not produce a Figma-only answer when the request is to build a product. Code
is primary; Figma or another editable artifact is optional output when requested.
