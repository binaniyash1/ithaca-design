# High-value discovery

Use this gate before implementation. The goal is to remove consequential
ambiguity without making the user complete a design questionnaire.

## Inspect before asking

First read the complete prompt, PRD, attachments, linked specifications, and
relevant repository context. Treat information already present in any of these
sources as answered. Do not ask the user to repeat it.

Build a private list of missing decisions, then resolve each item in this order:

1. explicit user or PRD evidence;
2. supplied attachments and existing product behaviour;
3. target-repository conventions and available data;
4. a safe, reversible assumption;
5. a user question.

Ask only when the answer is likely to materially improve at least one of:

- the primary job or dominant screen question;
- information priority or object relationships;
- the core workflow or result of an action;
- fields, realistic content, scale, or grouping;
- permissions, destructive behaviour, or recovery;
- loading, empty, error, partial, or success states;
- responsive priorities or a required device workflow.

## Question budget

- Ask zero questions when the supplied context is sufficient.
- Prefer 3–7 questions when discovery would materially improve the result.
- Ask no more than 10 questions across the entire request, including follow-up
  rounds. Do not treat 10 as a target.
- Prefer one compact batch. Ask a second round only when an answer introduces a
  genuine contradiction or a new implementation blocker.
- Never pad the batch with low-impact questions merely because budget remains.

## Required versus optional

A question is required only when guessing would change permissions, destructive
behaviour, the data model, the fundamental workflow, or whether the requested
product can function. Explain the blocker briefly and wait for the answer.

All other questions are enhancement questions. Introduce them with language
such as: `I can proceed with reasonable assumptions, but these answers would
improve the result.` Tell the user they may answer any subset or say `use your
judgment` for the rest.

If the user answers only some enhancement questions, do not ask the skipped
ones again. Proceed using reasonable assumptions and report material ones in
the handoff. If the user says `just build it`, proceed immediately unless a
true blocker remains.

## Question construction

- Ask one decision per numbered question in plain product language.
- Ask for observable behaviour, priority, or realistic data—not abstract taste.
- When useful, offer 2–4 plausible options, recommend one, and allow a short
  custom answer. Options are accelerators, not constraints.
- Put the highest-impact questions first.
- Avoid asking for information the implementation can discover directly.
- Do not ask the user to produce a wireframe, component list, design brief, or
  exhaustive state matrix.

## Questions Ithaca owns

Do not ask the user to choose cards versus tables, panes, navigation placement,
spacing, radius, typography, shadows, gradients, exact colours, component
libraries, or similar visual implementation details unless they are explicit
brand, accessibility, platform, or existing-product constraints.

Infer those decisions from Ithaca, the target repository, and the product job.
The user supplies product truth; Ithaca supplies design judgment.

## High-value question pool

Select only unanswered, relevant questions. Never ask this entire list.

1. Who is the primary user, and what are they trying to finish when they open
   this surface?
2. What single question should the screen answer within five seconds?
3. Which information is essential before the user can take the primary action,
   and which information is only supporting context?
4. What should happen to the object and the surrounding screen after the main
   action succeeds?
5. Which actions or fields change by role or permission?
6. What are the normal record count, maximum scale, and longest realistic
   labels or values?
7. Which empty, loading, failure, partial-success, or in-progress states matter
   for this workflow?
8. What should selection reveal, and should that context be absent before the
   first selection?
9. What must remain immediately usable on the smallest required device?
10. What existing route, component, data source, or product convention must be
    preserved?
