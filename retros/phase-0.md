# Phase 0 — Skeleton and trust loop

**Dates:** 19 Aug 2026
**Plugin version at end of phase:** 0.1.0
**Commits:** `9abaded` scaffold · `ca94196` canary skill · `7ecf361` install page

**Gate 0: PASS**, with auto-update carried forward as the one pending item.

Goal was to prove install → restart → trigger → version announcement against a
skill that does nothing, and find the friction before there is content to lose.
It did, and the trust loop is closed end to end.

---

## Gate 0 — trigger tests

**Result: PASS.** All five checks behaved as specified. Run from a session
started after the install.

| # | Prompt | Expected | Result | Notes |
|---|---|---|---|---|
| 1 | `design me a settings page` | fires without the skill being named | ✅ **FIRED** | Triggered on plain-language phrasing, skill never named |
| 2 | (the reply to #1) | opens with the exact announcement line | ✅ **EXACT MATCH** | `Using the Ithaca agent skill — v0.1.0, updated 19 Aug 2026.` verbatim, first line |
| 3 | `what's the capital of France` | does **not** fire | ✅ did not fire | Gimme. Proves little |
| 4 | `make this better` | does **not** fire | ✅ did not fire | **The negative clause holds.** This is the result that counts |
| 5 | `I need a way for users to see their invoices` | (predicted) does not fire | ✅ did not fire | Known under-fire case, predicted in advance. See below |

### All three canary behaviours confirmed

The reply to test 1 did every required thing and nothing extra:

1. Opened with the version line, exactly, before any other text.
2. Refused to generate — stated no tokens, no component contracts, no rules
   layer exist, and **explicitly declined to fall back to Tailwind or shadcn
   defaults**. That refusal is the whole point. A plausible generic screen here
   would have taught the operator the plugin works when it does not.
3. Asked one question, and said the answer is not stored.

The version-announcement loop is closed end to end: manifest → skill → live
install page, all reading `0.1.0`, with the build refusing to ship them out of
step.

### On test 4, and on test 5

**Test 4 is the one that mattered and it passed.** Test 3 was never in doubt —
nothing about a geography question resembles a request to build UI. Test 4
probes the only thing narrowing an otherwise wide net: the negative clause
ending *"…or open-ended requests to improve something that do not name a UI
surface to build."* Without it, "improve" reads as adjacent to "design" and the
skill fires on every refactor request in the repo. It held.

**Test 5 under-fired, exactly as predicted when the description was written.**
The prompt names no UI noun — no screen, page, table, or view — so there is
nothing for the description to match on. This is the anticipated cost of landing
the trigger on the conservative side of the dial, and the reasoning stands: a
false positive hijacks an unrelated task and answers "I cannot generate screens"
to someone asking about a database migration, which erodes trust during the exact
phase meant to establish it. A false negative costs one retry.

**Decision: do not widen the description.** The fix belongs in Phase 3's
clarifying-question flow, not in the frontmatter. Outcome-shaped phrasing
("a way for users to…", "somewhere to show…") is precisely how a PM talks, and
the masterplan's premise is that such prompts get met with interrogation — but
widening the net before there is anything to catch them with only produces
confident wrong firing. Revisit at Phase 3, not before.

### Gate 0 status

| Check | Result |
|---|---|
| Plugin appears in the installed list | ✅ `ithaca-design@ithaca` v0.1.0, enabled, user scope |
| Fires on `design me a settings page` after restart | ✅ |
| Reply opens with the exact version line | ✅ |
| `what's the capital of France` does not fire | ✅ |
| Install page deploys; command works from a clean directory | ✅ live, rebuilds on push |
| Auto-update refreshes the catalogue | ⏸ **PENDING** — see below |

**Gate 0 passes**, with auto-update the single carried-forward item. It stays
pending until the marketplace source switches from a local directory to
`binaniyash1/ithaca-design`, because until then there is no remote to pull from
and nothing to verify.

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
