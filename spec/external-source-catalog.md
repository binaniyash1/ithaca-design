# External source catalog

Status: working evidence ledger  
Last verified: 28 August 2026

This file tells Ithaca which external resources it may reuse, which it may
consult only as design evidence, and how third-party work is subordinated to the
Gushwork rules. It is not a vendor dump and does not grant rights beyond each
source's current license or terms.

## Operating rule

The order of authority is:

1. Gushwork rules and tokens.
2. Gushwork-owned Figma components.
3. A compatible existing component in the target repository.
4. One verified external component, installed on demand.
5. A new component only when 1–4 cannot satisfy the requirement.

External components provide behavior and structure. They do not bring their
default palette, spacing, radius, typography, shadow, density, or motion into a
Gushwork screen unchanged.

### Source states

| State | Meaning | Permitted use |
|---|---|---|
| `code-approved` | Source code is publicly accessible and its path is covered by a compatible license | Inspect, install, adapt, test, and ship while preserving required notices |
| `design-only` | A public preview exists but source is paid, locked, unlicensed, or outside an approved path | Study the interaction problem and visual principle; do not extract or reconstruct locked code |
| `rules-only` | The source is an article, checklist, or skill catalog rather than a component library | Convert supported guidance into original, checkable Ithaca rules |
| `conditional` | Mixed licensing, paid/free split, or unclear scope | Resolve the exact item and path before use |

### Required check before installation

For every external item, record:

- source name, item name, canonical URL, and retrieval date;
- exact license and the file/path it covers;
- free or paid access state;
- runtime dependencies and framework assumptions;
- accessibility, keyboard, responsive, and reduced-motion behavior;
- which Gushwork tokens and component contract will replace its styling;
- why an existing project or Gushwork component was insufficient.

No item passes because a page says “free,” because code is visible in DevTools,
or because a copy button exists. Paid previews never authorize source access.

## Source matrix

| Source | Kind | Access | License / boundary | Ithaca disposition |
|---|---|---|---|---|
| [Beautiful UI](https://www.beautifului.dev/) | AI-native component catalog | Public copy-paste code | MIT; license applies to published component code, not third-party marks | `code-approved`; strongest for agent surfaces |
| [beUI](https://beui.dev/) | Motion, agent components, and composed blocks | Public registry, raw source endpoints, and shadcn distribution | Free catalog is MIT; Pro catalog is paid/private | Free: `code-approved`; Pro: `design-only` unless the user supplies a valid license |
| [Rare UI](https://www.rareui.com/components) | Small animated component catalog | Public shadcn registry and GitHub source | Registry is MIT; site design/name/logo are excluded; do not repackage as a competing library | `code-approved` for registry components |
| [Transitions.dev](https://transitions.dev/) | Motion recipes and motion review tooling | Free CSS/React recipes; larger Pro set behind account/license | Public repository and free recipes are MIT; Pro recipe source requires paid access | Free: `code-approved`; Pro: `design-only` until licensed |
| [shadcn/ui](https://ui.shadcn.com/docs/components) | Accessible primitives and code-distribution system | Public registry and CLI | MIT | `code-approved`; default foundation, never the final visual language by itself |
| [UI Skills](https://www.ui-skills.com/) | Agent skill/rule directory | Public skill source and CLI | Directory repository is MIT; individual linked skills must still be checked | `rules-only`; selectively synthesize, never activate conflicting skills blindly |
| [coss ui](https://coss.com/ui) | Base UI component library | Public source and copy-paste docs | Mixed repo: only `apps/ui/` and `apps/origin/` are MIT; all other paths default to AGPLv3 | `conditional`; use only verified MIT paths unless the project accepts AGPL |
| [Design System Checklist](https://designsystemchecklist.com/) | Design-system planning checklist | Public website and repository | Repository describes itself as open source but currently has no root license file | `rules-only`; summarize facts, do not copy its code/content wholesale |
| [ReUI](https://reui.io/components) | shadcn examples, advanced primitives, blocks, and icons | 1,000+ free examples plus paid Pro/Ultimate catalogs | Free repository and registry are MIT; Pro blocks and Ultimate icons require purchase | Free: `code-approved`; paid preview: `design-only` until licensed |
| [You Don’t Need Animations](https://emilkowal.ski/ui/you-dont-need-animations) | Motion design essay | Public article | Copyrighted editorial work, not a component license | `rules-only`; paraphrase principles with attribution |

## Component inventories

Counts below describe named component families or catalog categories, not every
demo variation. Large registries change frequently; Ithaca should query their
live index when selecting an implementation and pin the result it uses.

### Beautiful UI — 20 AI-native primitives

1. Loading State
2. Thinking
3. Streaming Text
4. Approval Card
5. Tool Chips
6. Task Rows
7. Chat
8. Prompt Bar
9. Recommendation Card
10. Context Cards
11. Diff Table
12. Records Table
13. Filter Table
14. Sidebar Nav
15. Search
16. Flowchart
17. Insight Cards
18. Code Block
19. Fine-tune Card
20. Selection Actions

Best fit: agent workspaces, human-in-the-loop decisions, live task traces,
streaming answers, citations, diffs, and agent-assisted data work. Treat these
as composite references: reuse their behavior where useful, then enforce the
Gushwork density, surface, and action hierarchy.

### beUI — public free catalog

The canonical machine-readable index is `https://beui.dev/r`; item details are
`https://beui.dev/r/{slug}` and raw source is
`https://beui.dev/r/{slug}/raw`.

#### Motion components

Tilt Card; Button; Animated CTA Buttons; Expandable Control; Marquee; Tabs;
Switch; Input; Select; Combobox; Checkbox; Radio Group; Bottom Sheet; Pull to
Refresh; Shared Layout Background; Bounce Sidebar; Animated Sidebar; File Tree;
Preview Rail; Dock; Tooltip; Animated Context Menu; Popover; Morphing Modal;
Center Morph Modal; Text Animation; Number Animation; Animated Badge; Action
Swap; Animated Toast Stack; Theme Toggle; Bouncy Accordion; Drawer; Scroll
Animation; Range Slider; Wheel Picker; Table; Shader Background; Cylinder
Carousel; Loader.

#### Agent components

Message Bubble; Message; Message Scroller; Prompt Input; Todo List; Code Block;
Approval Card; File Diff; Tool Result; Streaming Response; Image Generation;
Tool Approval; Citations; Agent Activity; Agent Loading States; AI Sidebar; Chat
App.

#### Composed blocks

Infinite Masonry; Notification Stack; Project Folder; Fixtures; Availability
Scheduler; Multi-chain Swap; Dynamic Island; Command Palette; Morphing Search;
Expandable Action Bar; Overflow Actions; Expandable Tabs; Morphing Tabs;
Swipeable List; File Upload; Prediction Market; Wallet Card; OTP Input; Sign Up
Form; Bloom Menu; Feedback Widget; 404 / Not Found.

Selection warning: several beUI pieces are deliberately expressive. Goo,
cylinder, shader, magnetic, bloom, and large morph effects are low-density-only
candidates and require a real interaction purpose. They are not allowed as
ambient dashboard decoration.

### Rare UI — 14 named components

Notification Bell; Step Player; Grid Reveal; Folder; Code Block; Gravity
Letters; GitHub Activity; Fluid Orb; Bounce Sidebar; Proximity Sidebar; Scroll
Progress; Duration Picker; OTP Input; Emoji Reaction.

Best fit: one signature interaction on a low-density surface, AI activity, file
or progress presentation, and compact feedback. Do not combine multiple “rare”
effects in one view; rarity disappears when everything performs.

### Transitions.dev — free and paid motion recipes

The public repository documents at least these free/core recipes: Card Resize;
Number Pop-in; Notification Badge; Text States Swap; Menu Dropdown; Modal
Open/Close; Panel Reveal; Page Side-by-side; Icon Swap; Success Check; Avatar
Group Hover; Error State Shake. The published free skill currently contains a
larger set of recipe files, so selection must use its live list rather than this
summary.

Publicly previewed additional recipes include: Confetti Burst; Gooey Plus Menu;
Card Stack Hover; Input Clear Dissolve; Skeleton Loader/Reveal; Text Reveal;
Sliding Tabs; Drag and Drop; Shimmer Text; Organic Shimmer; Tooltip; 3D Tilt;
Dropdown Morph; Accordion; Toast; Like Button; Image Open Tilt; Learn-more
Hover; Checkbox; Spinner-to-check; Spinning Counter; Toggle; Gradient Text;
Delete Dissolve; Thinking States; Reasoning Stream; Streaming Text; Matrix Dot
Loader; Banner Stacking; Image-generation Placeholder.

The live catalog, not visual availability, decides free versus Pro. Free code
may be installed; Pro designs may be referenced but Pro source is unavailable
without the paid account.

### shadcn/ui — current primitives

Accordion; Alert; Alert Dialog; Aspect Ratio; Attachment; Avatar; Badge;
Breadcrumb; Bubble; Button; Button Group; Calendar; Card; Carousel; Chart;
Checkbox; Collapsible; Combobox; Command; Context Menu; Data Table; Date Picker;
Dialog; Direction; Drawer; Dropdown Menu; Empty; Field; Hover Card; Input; Input
Group; Input OTP; Item; Kbd; Label; Marker; Menubar; Message; Message Scroller;
Native Select; Navigation Menu; Pagination; Popover; Progress; Questionnaire;
Radio Group; Resizable; Scroll Area; Select; Separator; Sheet; Sidebar; Skeleton;
Slider; Spinner; Switch; Table; Tabs; Textarea; Toast; Toggle; Toggle Group;
Tooltip; Typography.

Also available are framework helpers, chart examples, blocks, and registry
items. Use the CLI/registry to retrieve a pinned item; never assume a remembered
API matches the current Radix/Base variant in the target project.

### UI Skills — rule sources, not a component catalog

Relevant families observed in the directory include baseline and improvement
skills, frontend design and engineering, motion/animation review, React review,
interface and interaction design, visual-taste systems, Rams-style principles,
and web-design guideline checks.

Ithaca should extract only evidence-backed, non-conflicting checks. Useful
examples include:

- reserve geometry to prevent layout shift;
- use `tabular-nums` for changing numeric values;
- keep touch targets at least 44px where touch input applies;
- match nested radii instead of stacking unrelated corner values;
- express pressed state without moving surrounding layout;
- use existing project primitives and tokens before adding dependencies.

Do not install a broad third-party “taste” skill inside Ithaca. Its global
defaults can silently override the Gushwork rules.

### coss ui — 55 named components

Accordion; Alert; Alert Dialog; Autocomplete; Avatar; Badge; Breadcrumb; Button;
Calendar; Card; Checkbox; Checkbox Group; Collapsible; Combobox; Command; Context
Menu; Date Picker; Dialog; Drawer; Empty; Field; Fieldset; Form; Frame; Group;
Input; Input Group; Kbd; Label; Menu; Meter; Number Field; OTP Field; Pagination;
Popover; Preview Card; Progress; Radio Group; Scroll Area; Select; Segmented
Control; Separator; Sheet; Skeleton; Slider; Spinner; Switch; Table; Tabs;
Textarea; Toast; Toggle; Toggle Group; Toolbar; Tooltip.

License guard: component code must resolve to `apps/ui/` or `apps/origin/` before
copying. Do not pull similarly named code from `packages/ui/` under the MIT
assumption; the monorepo default applies outside the two named exceptions.

### Design System Checklist — guidance areas

This is not a component source. Use it as an audit map for foundations,
principles, accessibility, content, responsive behavior, component anatomy,
states, documentation, governance, contribution, release, and maintenance.

The Ithaca-specific interpretation is stricter: a checklist item graduates into
the spec only when it becomes a binary self-check or an explicit human review
gate. Vague completeness advice stays research evidence, not runtime guidance.

### ReUI — free library and paid catalogs

The free registry states 1,000+ examples across 71 categories. It contains
advanced in-house primitives and extensive shadcn composition examples.

#### Advanced in-house set

Alert; Autocomplete; Badge; Cascader; Data Grid; Date Selector; Event Calendar;
Filters; Frame; Gantt; Icon Stack; Kanban; Number Field; Phone Input; Rating;
Scrollspy; Sortable; Stepper; Timeline; Tree.

The source currently describes this inconsistently as 19 while listing 20; the
names above are authoritative for selection until the upstream metadata is
corrected.

#### shadcn example categories

Accordion; Alert Dialog; Aspect Ratio; Avatar; Breadcrumb; Button; Button Group;
Calendar; Card; Carousel; Chart; Checkbox; Collapsible; Combobox; Command;
Context Menu; Dialog; Drawer; Dropdown Menu; Empty; Field; File Upload; Hover
Card; Input; Input Group; Input OTP; Item; Kbd; Label; Menubar; Native Select;
Navigation Menu; Pagination; Popover; Progress; Radio Group; Select; Separator;
Sheet; Skeleton; Slider; Sonner; Spinner; Switch; Table; Tabs; Textarea; Toggle;
Toggle Group; Tooltip.

Use ReUI first for operational composites that would be expensive to invent:
advanced grids, filters, calendars, gantt, kanban, sortable structures,
timelines, steppers, trees, file uploads, and realistic dashboard composition.

Paid design-only catalogs currently include 490+ Pro blocks across application,
solutions, ecommerce, data-grid, and marketing use cases, plus 562 Ultimate
motion icons in four styles. Study public previews for hierarchy and
composition; do not extract their source or trace their icons. If the user later
buys a license, record that access before moving a specific item to
`code-approved`.

### Emil Kowalski — motion rules

This source contributes rules rather than assets:

1. Every animation must explain state, preserve spatial continuity, or provide
   proportionate delight. If it does none, remove it.
2. Frequency lowers the motion budget. Repeated navigation, keyboard actions,
   and high-frequency controls should be instant or nearly instant.
3. Ordinary interface motion should generally finish below 300ms; start near
   150–200ms and justify anything slower.
4. Direction must match spatial cause: entrances and exits use consistent
   origins and reverse paths where that aids prediction.
5. Delay belongs only where it prevents accidental activation. After the first
   tooltip in a group, adjacent tooltip movement should be immediate.
6. Delight is reserved for infrequent, meaningful moments.
7. Reduced motion preserves the final state and information without movement,
   blur, or scale.

## Selection map for Ithaca

| Need | Preferred source | Fallback | Gushwork constraint |
|---|---|---|---|
| Basic accessible primitive | shadcn/ui | coss `apps/ui/` | Replace all visual tokens; preserve behavior and accessibility |
| Dense operational composite | ReUI free | shadcn composition | Hairlines over shadows; compact controls; no decorative motion |
| Agent/chat/work trace | Beautiful UI or beUI agent set | shadcn AI primitives | Calm chronology, stable streaming geometry, explicit approvals |
| Signature low-density interaction | Rare UI or beUI motion | Transitions.dev | At most one signature effect per view; purpose required |
| Ordinary transition | Transitions.dev free | beUI motion | Prefer <300ms, reversible spatial logic, reduced-motion path |
| Paid composition inspiration | ReUI Pro / Transitions Pro public preview | None | Design evidence only; no locked code or icon reconstruction |
| Design-system completeness audit | Design System Checklist | UI Skills | Convert to checkable Ithaca rules; do not copy prose wholesale |

## Visual synthesis rules

Using external code never permits a visual collage. Before a component ships:

1. Bind all color, typography, spacing, radius, border, and elevation to
   Gushwork tokens.
2. Choose high- or low-density mode before styling.
3. Remove decorative color from chrome; reserve saturation for semantic status,
   chart encoding, the primary action, or a deliberately approved focal state.
4. White surfaces mark decision boundaries. Do not turn every nested element
   into a card.
5. In high density, use hairlines and shared containers; shadows are forbidden.
6. In low density, one white focal surface may use subtle shadow; gradients may
   provide atmosphere only when they do not reduce information clarity.
7. Numeric data uses the registered mono/tabular treatment.
8. No motion may cause layout shift, delay a frequent action, or carry meaning
   without a static equivalent.
9. Implement default, hover, focus-visible, active, disabled, loading, empty,
   error, success, overflow, long-content, narrow-width, and reduced-motion
   states as applicable.
10. Screenshot review compares the result to Gushwork references, not to the
    external library’s default demo.

## What “ingested” means

For a source to be ingested, Ithaca has:

- a verified catalog entry and access state;
- a component/category inventory;
- a lawful retrieval route for reusable source;
- a selection rule explaining when to use it;
- adaptation rules that prevent visual drift;
- provenance retained in the generated project;
- a live-version check before installation.

It does not mean mirroring every upstream file. The runtime should search the
catalog, retrieve one approved item, inspect its real API and dependencies,
adapt it, and audit the result. This keeps Ithaca small, current, and legible.
