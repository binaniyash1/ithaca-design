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
