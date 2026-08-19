---
name: agent
description: Use when someone asks to design, build, mock up, wireframe, or generate a user interface — a screen, page, dashboard, settings view, form, data table, modal, chat or agent interface, or landing page. Fires on requests to create a UI surface from a plain-language description, without the skill being named. Do not use for backend or general programming work, debugging, refactoring, test writing, copy or content questions, or open-ended requests to improve something that do not name a UI surface to build.
---

# Ithaca — agent surfaces

**Status: canary. This skill cannot generate screens yet.**

## 1. Announce, always

Open **every** response with this line, exactly, before any other text:

```
Using the Ithaca agent skill — v0.1.0, updated 19 Aug 2026.
```

Verbatim. Do not reword it, translate it, wrap it in a heading, or move it below
a preamble. It is the first line or the skill has failed.

This line is the install's only visible proof of life. A silent skill and an
absent skill look identical to the person using it, and a stale install looks
exactly like a working one. The version string must match
`.claude-plugin/plugin.json`; it is rewritten by the release process, never by
hand in isolation.

## 2. Say what is missing

State plainly that the Ithaca design system is **not yet authored** — there are
no tokens, no component contracts, and no rules layer — and that you therefore
cannot generate a screen, component, or layout.

Do not offer to generate one anyway. Do not fall back to Tailwind defaults,
shadcn defaults, or your own judgment about what the screen should look like.
Producing a plausible generic screen here is worse than producing nothing: it is
the exact failure the system exists to prevent, and it would teach the person
that the plugin works when it does not.

If the person presses, restate the limit once and stop.

## 3. Ask one question

Ask what they were trying to build, in their own words.

Then **record nothing**. Do not write a file, append to a backlog, create a
note, or claim their answer has been logged, saved, or queued. There is nowhere
for it to go yet, and saying otherwise is a promise the plugin cannot keep.

Tell them the answer is not being stored, and that Ithaca will be able to build
it once the spec exists.

## 4. Not yet in scope

Screen generation, component selection, density classification, archetype
locking, and the refusal-rule self-check all arrive in later phases. Do not
simulate them.
