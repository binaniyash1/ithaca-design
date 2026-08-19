# Phase 0 — Skeleton and trust loop

**Dates:** 19 Aug 2026
**Plugin version at end of phase:** 0.1.0
**Commits:** `9abaded` scaffold · `ca94196` canary skill · `7ecf361` install page

Goal was to prove install → restart → trigger → version announcement against a
skill that does nothing, and find the friction before there is content to lose.

---

## Gate 0 — trigger tests

> **NOT YET RECORDED.** These require a session started *after* the install.
> The session that built Phase 0 predates it, so the skill was not in its
> loaded set and the tests could not be run. Fill this table in from a fresh
> session before starting Phase 1 — an unrun gate is a failed gate.

| # | Prompt | Expected | Fired? | Notes |
|---|---|---|---|---|
| 1 | `design me a settings page` | fires without the skill being named | — | |
| 2 | (the reply to #1) | opens with exactly `Using the Ithaca agent skill — v0.1.0, updated 19 Aug 2026.` | — | |
| 3 | `what's the capital of France` | does **not** fire | — | |
| 4 | `make this better` | does **not** fire | — | |

**Test 4 is the one that matters.** Test 3 is a gimme — nothing about a
geography question resembles a request to build UI, and passing it proves
almost nothing. Test 4 is the honest probe of the negative clause in the
frontmatter description, which is the only thing narrowing an otherwise wide
net. If exactly one of these is worth reading carefully, it is that one.

If test 1 fails but test 4 passes, the description is too conservative — widen
it with outcome-shaped phrasings ("a way for users to…", "somewhere to show…")
rather than by deleting the negative clause. That clause is load-bearing.

---

## Install friction — what it actually was

**Bare `.` is rejected as a marketplace source.**
`claude plugin marketplace add .` fails with
`Invalid marketplace source format. Try: owner/repo, https://..., or ./path`.
Needs `./path` or an absolute path. Small, but it is the very first command a
new contributor runs, and the error does not say "use ./ instead of ." in so
many words.

**Auto-update has no CLI flag at all.**
`claude plugin marketplace add --help` offers only `--scope` and `--sparse`.
The documented path is the interactive `/plugin` → Marketplaces → Enable
auto-update, which is unavailable in a non-interactive session. Enabling it
required editing `~/.claude/settings.json` directly to add `"autoUpdate": true`
to the `extraKnownMarketplaces.ithaca` entry.

This matters more than it looks. Local and third-party marketplaces ship with
auto-update **off by default**, so the failure mode is not an error — it is a
catalogue that silently never refreshes. Anyone installing from the terminal
rather than the UI will land in that state without knowing. The install page now
carries this as its own numbered step with the reason attached.

---

## Baseline — the zero point for P4.1

```
Always-on:   ~164 tok   added to every session
On-invoke:   ~670 tok   paid each time the skill fires
```

From `claude plugin details ithaca-design`, at 1 skill and 0 components.

P4.1 asks what the always-loaded portion costs at 100 components and at 400.
**This is the measurement's zero point.** It is worth being precise about what
it does and does not include: 164 tokens is the frontmatter description plus
routing surface, with no component index, no rules layer, and no archetype list.
All three of those land in the always-loaded body later, so the growth curve
starts here but is not linear from here.

Re-measure with the same command at the end of every phase that adds to the
skill body. A number that only gets checked at P4.1 will already be a problem
by the time it is read.

---

## Auto-update — configured, NOT genuinely tested

Set, verified in settings, and one line in the diff. **But not exercised.**

The marketplace source is currently:

```json
{ "source": { "source": "directory", "path": "/Users/yashbinani/ithaca-design" } }
```

A `directory` source has no remote to pull from — background auto-update is a
`git pull`, and against a local path it re-reads files that are already current.
So the setting is correctly *placed* but has never actually *done* anything.

**Re-test after switching the marketplace source to
`binaniyash1/ithaca-design`.** Only then does the mechanism have a remote, a
fetch, and a way to fail. Treat the Gate 0 auto-update edge case as unverified
until that switch happens and a version bump propagates without manual
intervention.

Related, and worth carrying forward: background refresh disables git credential
helpers, so it cannot authenticate to a **private** repo over HTTPS. The SSH
remote set up in P−1.2 is what makes this work unattended — that decision pays
off precisely here, and only here.

---

## The build-time version mismatch check

`scripts/build-docs.mjs` reads the version from `plugin.json` and lifts the
announcement line verbatim out of `SKILL.md`. If the two disagree, **the build
fails and the deploy does not ship**:

```
BUILD FAILED
Version mismatch — refusing to publish.
  plugin.json announces : 0.2.0
  SKILL.md announces    : 0.1.0
```

Verified by faking a bump to 0.2.0; exits 1.

The reasoning: `plugin.json` wins version resolution *silently*, so a stale
`SKILL.md` announces a version nobody can trace back to anything. That is the
same class of failure as the plugin not loading at all — the difference is that
one is visible in ten seconds and the other survives for weeks. Making it a hard
build error converts it from archaeology into a red deploy.

Same reasoning drove removing `version` from `package.json`: a second semver in
the repo is the identical trap wearing different clothes.

---

## The three questions

**1. What took longer than estimated, and what specifically was underestimated?**

Nothing ran long against the 2–3 day estimate — Phase 0 landed in a single
session. What was underestimated was how much of the phase is *verification*
rather than construction. The manifests took minutes; establishing that the
version genuinely resolves from `plugin.json` (rather than falling through to
`unknown`), that the schema URLs resolve, that the marketplace validates strictly,
and that the deploy rebuilds on a git event rather than a CLI push took the
majority of the time. That ratio is the phase working as intended, not a problem.

**2. What did the validation gate catch that you would have shipped?**

Three things, none of which would have announced themselves.

- **A dead `$schema` URL.** Guessed `claude-code-plugin.json`; the real name is
  `claude-code-plugin-manifest.json`. `claude plugin validate --strict` passed
  anyway — it ignores `$schema` entirely — so this would only ever have surfaced
  as mysteriously absent editor autocomplete.
- **A refusal-rule violation on the install page itself.** `.copy:hover` swapped
  to a tinted background while keeping its box-shadow: a shadow on a coloured
  background, rule 2. On the page shipping the rules. Found only by running the
  self-check against the built output rather than trusting the intent.
- **A duplicate `.vercel` ignore entry** appended by `vercel link` on top of the
  one already there. Cosmetic, but it is the same species as setting version in
  two places: two declarations of one fact, one of which will drift.

**3. What rule is missing that you only discovered by looking at output?**

Two, both about the *page*, which is the only real output this phase produced.

- **Tinted surfaces are not neutral surfaces.** The refusal rule says "no shadows
  on a coloured background" but says nothing about where the line sits. Is
  `#fbeadd` — a 4%-saturation warm wash — "coloured"? I ruled that it is, and
  dropped the shadow. The spec needs an explicit threshold, because on a page
  whose entire palette is warm-tinted, "coloured background" without a number is
  a rule that cannot be checked, and §6 is emphatic that an uncheckable rule is
  decoration. Candidate: any surface whose saturation exceeds some bound, or
  simply "shadows are permitted only on `--surface`".
- **Empty states need a stated shape, not just permission to exist.** The
  changelog empty state was a judgement call made on the spot — title, one
  explanatory sentence, no call to action. Part E lists empty states as required,
  but nothing anywhere says what one is *made of*. Write that contract before
  Phase 2, or fifty components will each invent their own.
