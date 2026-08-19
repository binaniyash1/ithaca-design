# Empty states — contract

**Status:** provisional. Token names below refer to roles proposed in
`tokens-v0.md` (not yet ratified); the shapes here do not depend on the values.

Atlas components **64**, **65**, **66**. These are **three components, not three
variants of one.** They share a skeleton and diverge in every part that matters.
Conflating first-run with filtered is the specific bug this file exists to stop.

## Selection — check in this order

```
1. the request failed              → 66  failed to load
2. any filter or search is active  → 65  filtered
3. otherwise (never had data)      → 64  first run
```

Precedence is strict. A failed load **with filters active is 66, never 65**.
A surface that can render zero rows must declare which of the three applies —
a generic blank is a refusal-level defect.

## Shared skeleton

Slots, in order. Which are permitted is set per component below.

```
[illustration]  [headline]  [body]  [action]  [link]
```

Universal prohibitions, all three:

- Never more than **one** button. No secondary button, ever.
- Never a spinner or skeleton — those are loading, a different state.
- Never centred body text.
- Never raw system output: no stack trace, error code, query string, or SQL.
- Never a shadow (they sit inside a parent surface that already has one).

---

## 64 — First run

Never had data. The job is guidance.

| | |
|---|---|
| **Contains** | illustration · headline · body · one primary action (create) · optional text link |
| **Illustration** | **Permitted, low density only.** Dropped entirely in high density |
| **Headline** | ≤ 6 words. Names the thing that will exist |
| **Body** | One sentence, ≤ 120 characters. Says what to do, not what is absent |
| **Action** | Exactly one primary. Always a **create** action |
| **Density** | Both. High density: no illustration, tighter spacing, body optional |
| **Colour** | **Scoped permission applies.** Bolder chromatic colour allowed here — this is the canonical case for it |

**Never contains:** any reference to filters or search · a clear or reset action ·
a retry · error or failure language · the word "error" · a bordered container.

---

## 65 — Filtered

Had data; the filter excluded it. The job is escape.

| | |
|---|---|
| **Contains** | headline · body · one action (clear filters) |
| **Illustration** | **Never.** This is a transient state inside working chrome |
| **Headline** | ≤ 5 words |
| **Body** | ≤ 90 characters, and **must name the active filter or query** — otherwise the clear action is unattributable |
| **Action** | Exactly one. Always **clear / reset filters**. Never create |
| **Density** | Both. Most often high |
| **Colour** | **Does not apply.** Neutral only — colour here is noise inside a working surface |

**Never contains:** *"create your first…"* or any first-run phrasing · a create
action · an illustration · a bordered container.

> The copy test: if the sentence would still make sense with no filter applied,
> it is 64's copy in 65's slot. Rewrite it.

---

## 66 — Failed to load

The request failed. The job is recovery, and **looking unmistakably different
from the other two.**

| | |
|---|---|
| **Contains** | icon · headline · body · one action (retry) · optional text link to status |
| **Illustration** | **Never.** A small neutral icon only — an illustration reads as decoration on a failure |
| **Headline** | ≤ 5 words. Names the failure plainly |
| **Body** | ≤ 90 characters. Human summary, never the raw error |
| **Action** | Exactly one. Always **retry** |
| **Density** | Both |
| **Colour** | **Does not apply, and specifically not `danger`.** A failed load is not a destructive action; semantic colour is reserved for real status meaning |

**Distinctness — the checkable part.** 66 renders inside a **bordered container**
using `border-control`. 64 and 65 are borderless. That is the whole signal, and
it is binary:

```
is this empty state inside a bordered container?  →  yes = 66, no = 64 or 65
```

Structure carries the distinction, not colour. Reaching for red would violate
the semantic-colour rule and make a network blip look like data loss.

**Never contains:** a create action · a clear-filter action · an illustration ·
`danger` colour · a stack trace or error code in the body.

---

## Self-checks

Run before emitting any surface that can render zero rows.

1. Does it declare 64, 65, or 66? A generic blank fails.
2. Exactly one button? Two fails.
3. If 65 — does the body name the active filter, and is the action *clear*?
4. If 65 — does the copy contain first-run phrasing? Fails.
5. If 66 — is it bordered, and is 64/65 unbordered? Otherwise indistinguishable.
6. If 66 — is `danger` used anywhere? Fails.
7. Illustration present outside 64-in-low-density? Fails.
8. Copy over its ceiling? Fails.
