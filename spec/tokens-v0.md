# tokens-v0.md

> **PROVISIONAL.** Authored before the seed screens exist, so these values are
> *coherent*, not *right*. **P2.1 replaces this file wholesale** by extracting
> the real token layer from the five completed Figma screens. Nothing here is
> load-bearing except the token *names* and the two-mode structure — build
> against those, not against the hexes.

**Light mode only.** Dark values are authored alongside and marked `unused` so a
future addition is a mode, not a re-extraction.

## Structure

Two density modes. **A token that differs between modes is declared once per
mode. Nothing is averaged.** See [Per-mode declarations](#per-mode-declarations)
for the complete list of what diverges — everything not listed there is shared.

| | Low density | High density |
|---|---|---|
| Applies to | entry, onboarding, empty states, marketing, single-task | tables, dashboards, lists, settings |
| Depth from | soft shadow | hairline border |
| Shadow | permitted | **none, ever** |
| Background | warm gradient wash permitted | flat neutral |

---

## Colour

### Neutral ramp

Warm-tinted (hue ~30°). A true grey under a warm wash reads as dirty.

| Token | Light | Contrast vs surface | Role |
|---|---|---|---|
| `neutral-0` | `#fffdfa` | 1.00 | **`--surface`** — see below |
| `neutral-50` | `#faf6f0` | 1.06 | page base, high density |
| `neutral-100` | `#f4ede4` | 1.14 | sunken, inset, code |
| `neutral-200` | `#e7ddd0` | 1.32 | **hairline border** |
| `neutral-300` | `#d2c5b5` | 1.67 | strong divider |
| `neutral-400` | `#ab9e90` | 2.58 | disabled ink, placeholder |
| `neutral-500` | `#8a7d70` | 3.94 | control border (inputs, checkboxes) |
| `neutral-600` | `#6d6156` | 5.92 | **muted label** |
| `neutral-700` | `#4f463d` | 9.09 | secondary text |
| `neutral-900` | `#221e1a` | 16.30 | **body text** |

The three that must be unmistakable are far apart by construction:
**hairline 1.32 · label 5.92 · body 16.30.**

### `--surface` — the named surface token

```
--surface = neutral-0 (#fffdfa)
```

This exists to make the shadow rule checkable. A shadow is permitted **only** on
a fill bound to `--surface`. Every other fill — tint, wash, gradient, semantic
colour — takes depth from a hairline or from nothing.

```
self-check:  is this element's fill --surface?   yes → shadow allowed
                                                  no  → shadow forbidden
```

Run it **per state**. A fill that changes on hover changes the answer.

### Accent ramp — clay

One decorative accent, deliberately low saturation (0.50 at base, ~40% less
saturated than a full terracotta). It must read as *the* accent without
competing with semantic colour.

| Token | Light | Role |
|---|---|---|
| `accent-50` | `#faf3ef` | |
| `accent-100` | `#f2e3da` | wash, chips |
| `accent-200` | `#e5cbbc` | |
| `accent-300` | `#d0a992` | |
| `accent-400` | `#b5836a` | |
| `accent-500` | `#9c6a50` | hover |
| `accent-600` | `#8a5c45` | **base** — 5.59 on surface |
| `accent-700` | `#6f4936` | ink on accent wash — 6.25 on `accent-100` |
| `accent-800` | `#55372a` | |
| `accent-900` | `#3a251c` | |

**One decorative accent per screen.** Bolder, more chromatic colour is permitted
on marketing surfaces and first-run empty states only — never in app chrome.

### Semantic roles

Four. Usable **only** where they carry real status meaning — never decoratively,
never as a second accent. Muted to sit beside clay without shouting.

| Role | wash | base | ink | ink on wash |
|---|---|---|---|---|
| `success` | `#e8f0e9` | `#4a7c5c` | `#2f5d40` | 6.55 |
| `warning` | `#f7eede` | `#9a7434` | `#6d4f18` | 6.56 |
| `danger` | `#f7e8e5` | `#a8503f` | `#7a3227` | 7.62 |
| `info` | `#e7edf2` | `#4a708c` | `#2f4f66` | 7.32 |

---

## Type

**Five sizes. That is the whole scale.**

| Token | px | 
|---|---|
| `text-xs` | 12 |
| `text-sm` | 13 |
| `text-md` | 16 |
| `text-lg` | 20 |
| `text-xl` | 32 |

**Two weights. That is the whole set** — `400` and `600`. Refusal rule 1 (max two
font weights per screen) is therefore structurally unviolatable rather than
merely forbidden.

### Role mapping — low density

| Role | Size | Line | Tracking | Weight |
|---|---|---|---|---|
| display | `text-xl` 32 | 1.15 | −0.02em | 600 |
| heading | `text-lg` 20 | 1.30 | −0.01em | 600 |
| subhead | `text-md` 16 | 1.45 | — | 600 |
| body | `text-md` 16 | 1.60 | — | 400 |
| meta | `text-sm` 13 | 1.50 | — | 400 |

### Role mapping — high density

`text-xl` is **never** used in high density.

| Role | Size | Line | Weight |
|---|---|---|---|
| title | `text-lg` 20 | 1.25 | 600 |
| section | `text-md` 16 | 1.35 | 600 |
| subhead | `text-sm` 13 | 1.40 | 600 |
| body / cell | `text-sm` 13 | 1.45 | 400 (tabular numerals in cells) |
| label / meta | `text-xs` 12 | 1.35 | 600 / 400 |

**Row-height check.** Cell at 13 × 1.45 = 18.9px + 8px padding top and bottom =
**35px**, under the 44px cap, giving **25 rows** in a 900px viewport against a
12-row minimum.

---

## Spacing

Base unit 4px.

| Token | px |
|---|---|
| `space-1` | 4 |
| `space-2` | 8 |
| `space-3` | 12 |
| `space-4` | 16 |
| `space-5` | 24 |
| `space-6` | 32 |
| `space-7` | 48 |
| `space-8` | 64 |

## Radii

One scale. **One radius per surface, no exceptions within a surface.**

| Token | px | Note |
|---|---|---|
| `radius-sm` | 6 | controls, chips, badges |
| `radius-md` | 10 | panels, inputs, code |
| `radius-lg` | 16 | cards — **low density only** |
| `radius-full` | 9999 | pills, avatars |

## Border weights

| Token | px | Use |
|---|---|---|
| `border-hairline` | 1 | the structural line in high density |
| `border-focus` | 2 | focus ring only |

Named border colours: `border-subtle` = `neutral-200` · `border-strong` =
`neutral-300` · `border-control` = `neutral-500`. Controls need a heavier value
than table grid — collapsing these into one token yields either invisible inputs
or an industrial-looking table.

## Shadows

| Token | Value | Mode |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(56,40,24,.05), 0 6px 18px -8px rgba(56,40,24,.10)` | low only |
| `shadow-md` | `0 1px 2px rgba(56,40,24,.05), 0 14px 38px -10px rgba(56,40,24,.14)` | low only |
| `shadow-none` | `none` | **high density, always** |

Warm-tinted shadow (`56,40,24`), not black. A neutral-black shadow over a warm
palette reads grey and dead.

---

## Per-mode declarations

Every token that differs by mode, declared twice. **Never averaged.**

| Token | Low density | High density |
|---|---|---|
| `surface-page` | `neutral-0` + warm gradient wash | `neutral-50`, flat |
| `elevation` | `shadow-sm` / `shadow-md` | `shadow-none` |
| `depth-strategy` | shadow | `border-hairline` on `border-subtle` |
| `radius-card` | `radius-lg` 16 | `radius-md` 10 |
| `pad-container` | `space-5` 24 → `space-7` 48 | `space-3` 12 → `space-4` 16 |
| `pad-row-y` | `space-3` 12 | `space-2` 8 |
| `text-body` | `text-md` 16 / 1.60 | `text-sm` 13 / 1.45 |
| `text-max` | `text-xl` 32 | `text-lg` 20 |
| `gradient-wash` | permitted | **forbidden** |

### The gradient wash

Permitted as atmosphere and surface in **low density only**. This is a deliberate
exception, not an oversight — the warm wash is load-bearing there. Do not
over-correct into banning it.

```
--wash: radial-gradient(1200px 680px at 8% -10%,  #f7e9d9 0%, transparent 60%),
        radial-gradient(1000px 560px at 96% 2%,   #f0e2d4 0%, transparent 55%);
```

---

## Dark values — authored, `unused`

Not shipped in v1. Present so adding dark mode later is a mode addition rather
than a re-extraction. **Do not reference these tokens.**

| Token | Dark | | Token | Dark |
|---|---|---|---|---|
| `neutral-0` | `#17150f` | | `neutral-500` | `#8e8175` |
| `neutral-50` | `#1e1b15` | | `neutral-600` | `#a89b8d` |
| `neutral-100` | `#26221b` | | `neutral-700` | `#c5b9aa` |
| `neutral-200` | `#332e25` | | `neutral-900` | `#f2ece3` |
| `neutral-300` | `#453e33` | | `accent-600` | `#c08d70` |
| `neutral-400` | `#5e564a` | | `accent-700` | `#d4a687` |

Dark inverts the *role mapping*, not the ramp direction: `--surface` stays
`neutral-0`, body text stays `neutral-900`. Semantic washes need re-authoring at
low lightness — they are **not** derivable by inverting the light values, which
is the usual reason a retrofitted dark mode looks wrong.

---

## Brand override

A brand supplies **values only**. It may not add tokens, rename them, or change
the two-mode structure. If registering a brand requires touching anything outside
this file, the architecture is wrong — stop and fix it there, not here.

```
brands/gushwork.md  →  overrides accent-*, optionally neutral-* hue
                       inherits type, spacing, radii, shadows, per-mode rules
```
