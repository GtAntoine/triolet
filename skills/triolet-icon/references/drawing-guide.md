# The drawing guide

## The grid

Icons are drawn on a **96 × 96** grid; coordinates are in grid units, `(0, 0)` at the top left.
The same drawing is shown from 16 to 200 pixels, so think in simple, bold shapes.

### Keyline shapes

Draw inside one of four shapes centred on the grid, according to the silhouette of the object:

| Silhouette | Shape | From → to |
|---|---|---|
| round (a clock, a globe) | circle 72 across | 12 → 84 |
| square (a calendar, a chip) | square 64 × 64 | 16 → 80 |
| tall (a phone, a bottle) | 56 × 72 | x 20 → 76, y 12 → 84 |
| wide (a card, a car) | 72 × 56 | x 12 → 84, y 20 → 76 |

A square fills its corners and looks bigger than a circle of the same width: that is why the
square is smaller. A small piece may stick out of the shape (a badge, a flag, an arrow), never
the whole silhouette. Nothing goes closer than 8 units to the edge of the grid, and the middle
of the drawing sits on the middle of the grid (48, 48), within 4 units.

`pnpm icon:check` measures all this: it warns when more than 3 % of the grid is drawn outside the
shapes (a fraction of a percent is normal), when the drawing is off centre by more than 4 units,
or when its longest side is under 56.

## Shapes

```ts
rect(x, y, w, h, r, role)            // rounded rectangle, corner radius r
pill(x, y, w, h, role)               // rectangle with fully rounded ends
circle(cx, cy, r, role)
ellipse(cx, cy, rx, ry, role)
path(d, role)                        // filled SVG path
path(d, role, { outline: 3 })        // filled, plus a round outline of its own colour
stroke(d, role, width)               // a line: round ends and joins, not filled
ring(cx, cy, r, role, width)         // a circle that is stroked, not filled
```

Any shape takes `{ rotate: [degrees, cx, cy] }` as last argument. Prefer `rect`, `pill` and
`circle` to paths: they are easier to read and to fix. In a path, use whole numbers or halves,
absolute commands (`M L H V C A Z`), and round the corners with arcs (`A r r 0 0 1 x y`).

**Outer corners are rounded**, always: 3 to 12 units on bodies, fully round on small pieces; a
path with sharp points takes `{ outline: 3 }` or more to round them. Inner corners are free: a
bite cut into a shape, or a band that crosses a body and is cut by its outline, may be sharp.
**Lines are thick**: 3 units at least, usually 4 to 6, up to 12 for a roof or a handle.

## Colour roles

Each shape names a role, not a colour: the user picks the colours.

| Role | What it is for | Default |
|---|---|---|
| `base` | the body of light objects: a sheet, a card, a wall, a screen | light grey |
| `main` | the body of dark objects and what must read first: a lid, a roof, a person | navy |
| `accent` | ONE thing per icon, what the icon is about: the unread dot, the ballot, the flame | red |
| `soft`, `mid` | recessed details in a light body: empty slots (`soft`), lines of text (`mid`) | two tints |
| `mainLight` | the lit face of a dark object: the front of an open folder | lighter navy |
| `on` | ink on a colour: a check on a disc, the hands of a clock | white |
| `gap` | a disc slightly larger than a badge, drawn under it, to detach it | the surface |

### Proportions

The set as a whole aims at **60 % base, 30 % main, 10 % accent**. One icon may lean: a bell is
mostly one colour. But for every icon:

- there is an accent, and it covers **1 to 20 %** of the icon (aim for 5 to 12);
- the accent never covers more than `main`;
- no colour is nearly alone: `base` 15 to 88 %, `main` 8 to 70 %.

A good default: a `base` body, a `main` part a third of its size, an `accent` detail.

## Relief

A shape belongs to a layer, and the layer has one effect:

```ts
raised(shape, …)        // stands out: light upper left, shadow lower right. Bodies.
raised.small(shape, …)  // the tighter relief of small pieces: a corner, a badge, a flag
inset(shape, …)         // pressed in: a slot, a line of text, a hole, a screen, a button
plain(shape, …)         // no effect: ink (`on`), the `gap` disc
```

- Several shapes in one `raised(...)` share one relief, like one object in two colours (a
  calendar and its band). Shapes in separate layers each get their own.
- Draw **back to front**: what comes later is on top.
- `inset` goes ON a raised shape, never on the bare surface (except a shadow on the ground).
- A badge is three layers: `plain(circle(x, y, r + 3, 'gap'))`, `raised.small(circle(x, y, r, 'accent'))`,
  `plain(…ink in 'on'…)`.

- A light detail on a dark body is `inset` (a window, a label, a hole). `raised` in `base` on a
  `main` body gets a white halo: keep it for a real second object (a sheet coming out of a folder),
  with `raised.small`. `mainLight` on `main` is a nuance that disappears when the icon is flat.

Do not draw shadows, gradients or highlights yourself: the relief is the only depth.

## Parts

```ts
part('name', layer, layer, …)     // what moves as one piece
clip(shape, …nodes)               // cuts what is inside to a shape (a ballot entering a slot)
```

A part's name is kebab-case and says what the piece is (`hand`, `lid`, `line-1`). Parts may
nest (a badge that pops, with a star inside that pops later). A part with no motion is allowed.

## Categories

`arrows`, `civic`, `commerce`, `communication`, `data`, `design`, `development`, `devices`,
`documents`, `education`, `finance`, `health`, `interface`, `media`, `notifications`, `people`,
`places`, `security`, `settings`, `social`, `time`, `weather`, `work`. Take the closest one; food
and celebrations go to `social`, tools to `work`. A new category is worth it from five icons.

## Small sizes

- From 40 px the full relief is drawn; from 24 to 39 px only the large layers keep a
  (stronger) relief; under 24 px the icon is flat.
- So the icon must read **without any relief**: by its silhouette and its colours. Two shapes
  of the same role must not sit on each other unless losing their border is fine.
- No detail under 3 units; prefer three lines of text to five.

## A file, annotated

```ts
import { circle, icon, inset, part, path, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'calendar-check',
  category: 'time',
  keywords: ['calendar', 'date', 'done', 'event', 'confirmed', 'agenda'],
  gesture: 'The check badge pops on the calendar.',
  draw: [
    // Body: a light square, 64 wide (the square keyline), with a main band on top.
    raised(rect(16, 20, 64, 60, 12, 'base'), path('M28 20H68A12 12 0 0 1 80 32V38H16V32A12 12 0 0 1 28 20Z', 'main')),
    // Recessed details in the light body.
    inset(pill(26, 48, 28, 7, 'mid')),
    inset(pill(26, 61, 18, 7, 'mid')),
    // The badge: gap, accent disc, ink. It is the part that moves.
    part('badge', plain(circle(66, 66, 17, 'gap')), raised.small(circle(66, 66, 14, 'accent')), plain(stroke('M59.5 66.5L64.5 71.5L73 62', 'on', 4))),
  ],
  motion: {
    badge: pop(),
  },
});
```
