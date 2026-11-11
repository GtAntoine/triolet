# Gestures

Every icon moves: one part (sometimes two or three) makes one small gesture that tells what
the icon is for, then comes back exactly to rest. Motion is declared per part:

```ts
motion: {
  bell: swing({ pivot: 'top' }),
  'line-1': reveal(),
}
```

A gesture plays once, in 0.4 to 1 second (2 at most, all parts included). It answers a trigger
(hover, focus, press); the icon at rest must say everything by itself.

## The ten gestures

Every gesture takes `duration` (ms), `delay` (ms), `ease`, `iterations` and `pivot`.

| Gesture | What the part does | Typical use |
|---|---|---|
| `reveal({ from })` | grows into place from a side (`left` by default, `bottom`, …) | a line being written, a bar rising |
| `pop({ scale })` | swells (to 1.35) and settles | a badge, a dot, something that lands or lights up |
| `nudge({ x, y, settle })` | moves a little and comes back; `settle: true` returns slightly past | a lid lifting, a sheet coming out, an arrow |
| `bounce({ height })` | jumps and lands with a second small hop | a pin, a ball |
| `swing({ angles, at, pivot })` | rocks through angles around its pivot | a bell (`pivot: 'top'`), a card tilting, a head nodding |
| `spin({ turns })` / `spin({ from })` | turns: full turns, or from an angle back to rest | a clock hand, a gear, a wheel, a refresh arrow |
| `blink({ to })` | dims and comes back | a light, a cursor, a signal |
| `draw()` | its lines draw themselves from their start (needs `stroke(...)` shapes) | a check, a signature, a route |
| `travel({ from, fade })` / `travel({ via })` | arrives from an offset, or visits points and returns | a sun rising, a magnifier scanning, a pencil writing |
| `wave()` | ripples from its attached side | a flag, a ribbon |

`stagger(['line-1', 'line-2', 'line-3'], reveal({ duration: 400 }), 100)` gives the same gesture
to several parts, each starting 100 ms after the one before. Spread it in `motion`:
`motion: { ...stagger(...), dot: pop({ delay: 300 }) }`.

## Pivot

Where the part turns and scales around: `'center'` (default), a side or corner of the part's
own box (`'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, …), or a point of the grid
`[x, y]`. A bell swings from `'top'`, a bar rises from `'bottom'`, a clock hand turns around the
centre of the dial `[48, 48]`, a door opens from its hinge side.

## Curves

`ease: 'out'` (quick start, long soft landing: things that arrive), `'inOut'` (things that
travel or swing), `'outSoft'`, `'linear'` (a wheel that keeps turning).

## By hand

When no gesture fits, write the tracks: keys are `[moment from 0 to 1, value]`; a track not
keyed at 0 or 1 is at rest there; every track must END at rest.

```ts
import { tracks } from '@triolet/core';

// A heart beats twice, the second beat smaller.
heart: tracks({ duration: 800, ease: 'inOut' }, { scale: [[0.2, 1.2], [0.4, 1], [0.6, 1.12]] }),

// A ballot drops into a slot, disappears, and a new one comes up.
ballot: tracks({ duration: 900 }, {
  y: [[0.5, 15], [0.51, 15], [0.52, -6], [1, 0]],
  opacity: [[0.5, 1], [0.51, 0], [0.52, 0], [1, 1]],
}),
```

Tracks: `x`, `y` (grid units), `rotate`, `skewY` (degrees), `scale`, `scaleX`, `scaleY`,
`opacity` and `draw` (0 to 1). Rest is 0 for moves and angles, 1 for scales, opacity and draw.

## Choosing the gesture

- Animate **the accent** or the part that carries the meaning, not the body.
- Prefer one clear move to three small ones. Two parts may answer each other (a card tilts,
  then its chip pops) with a `delay`.
- Keep the part inside the picture: a `nudge` of 4 to 8 units, a `swing` of 5 to 15 degrees.
- A part that scales or turns must have room around it, or it will cover its neighbours.
- A loop (`iterations: 'infinite'` on every moving part, and `idle: true` on the icon) is for
  the rare icon that is a state rather than an object: a spinner, something lost or waiting.
