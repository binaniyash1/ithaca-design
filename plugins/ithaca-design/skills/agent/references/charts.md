# Charts and progress visualisation

Use chart styling to make comparison easier, not to decorate a dashboard.

## Shared construction

- Keep charts bounded inside a deliberate focal surface. Give the plotting area
  enough breathing room for labels and comparison, while keeping sparse data
  visually dense.
- Use mono numerals for headline metrics, axes, data labels, percentages,
  currency, and tabular summaries.
- Separate metric headers, plot, and legend or summary table into clear zones.
  Align repeated values into columns rather than floating labels around marks.
- Use pale neutral tracks and grid lines. Saturated colour belongs to the data,
  not the card border or surrounding chrome.
- On light interfaces, use a dark tooltip with high-contrast text.

## Segmented pipeline/progress recipe

Use this recipe when a pipeline is made of meaningful stages or contributions:

- Render one horizontal track per compared category or threshold.
- Encode stages as contiguous segments using a restrained multi-colour palette,
  such as blue, violet, orange-red, and amber. Keep the same stage-to-colour
  mapping across every track.
- Keep the empty remainder a very light neutral. Show a target or benchmark as
  a narrow dark tick rather than another filled segment.
- Use consistent track thickness, generous vertical separation, and aligned
  row labels. Do not compress the tracks into hairlines.
- Place the stage legend or aligned numeric breakdown below the plot or in a
  stable side region. Never force users to infer segment meaning from colour
  alone.
- Colour may have a restrained same-hue glow inside a low-density chart card,
  but high-density operational charts remain flat and shadowless.

## Avoid

- Identical gray bars for meaningfully different pipeline stages.
- A single brand-blue progress fill when the question requires stage
  composition rather than simple completion.
- Oversized plots with little data, legends floating unpredictably, redundant
  metric cards, or gradients that reduce value legibility.
