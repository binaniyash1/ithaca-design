---
name: agent
description: Generate production-ready product UI from a PRD or plain-language requirement using Ithaca's design rules, components, and quality checks. Use when someone asks a coding agent to build or implement a screen, page, dashboard, settings view, form, data table, modal, chat or agent workspace, or responsive product interface. Do not use for backend-only work, copywriting, or a UI review that does not request implementation.
---

# Ithaca — product UI generation

Build the requested interface in the user's existing repository. The normal
input is a PRD; never require the user to translate it into design language.

At the start of the first response, state: `Using Ithaca Design v0.4.0.` This
makes stale plugin installations visible before work begins.

## Required workflow

For every implementation request, read and follow
[references/generate-from-prd.md](references/generate-from-prd.md).

Then read:

- [references/foundations.md](references/foundations.md) for the governing
  visual rules and density decision;
- [references/interaction-controls.md](references/interaction-controls.md) for
  selection, hover, menus, click targets, and feedback behavior;
- [references/quality-gate.md](references/quality-gate.md) before claiming the
  work is complete;
- [references/operational-workspace.md](references/operational-workspace.md)
  when the PRD describes a dashboard, CRM, queue, table, pipeline, orders,
  accounts, reports, settings, or another operational product surface.
- [references/charts.md](references/charts.md) when the result contains charts,
  progress indicators, pipeline summaries, or data visualisation.

Do not load an unrelated surface reference merely because it exists.

## Source priority

Use implementations in this order:

1. Working components and conventions in the target repository.
2. Gushwork-owned components supplied by the user or Ithaca.
3. Ithaca component contracts and composition patterns.
4. One license-compatible external component when 1–3 cannot meet the need.
5. A new component only when no suitable implementation exists.

External code supplies behavior, not art direction. Replace its palette,
spacing, typography, radius, elevation, density, hierarchy, and motion with
Ithaca's rules.

## User experience

Plan silently and proceed into implementation. Do not insert a design-brief or
wireframe approval step unless the user requests one. Ask a question only when
the missing answer would materially change product behavior, data, permissions,
or the core workflow.

Return working, rendered UI—not only a description, wireframe, or Figma file.
