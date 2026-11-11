# Five icons, from brief to file

The sources are in `icons/`; open any of them for more.

## 1. `file-text`: a body, an accent, two details

**Brief.** A document. Body: a sheet (`base`, tall keyline). Accent: its folded corner. Details:
two lines of text (`main`, recessed). Motion: the lines write themselves, one after the other.

```ts
import { icon, inset, part, path, pill, raised, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'file-text',
  category: 'documents',
  keywords: ['document', 'file', 'form', 'paperwork', 'page', 'formulaire', 'dossier'],
  gesture: 'The two lines write themselves, one after the other.',
  draw: [
    // The sheet: one path, its top-right corner cut. 62 × 69, inside the tall keyline.
    raised(path('M31 14H60L80 34V70A13 13 0 0 1 67 83H31A13 13 0 0 1 18 70V27A13 13 0 0 1 31 14Z', 'base')),
    // The folded corner: a small piece, so `raised.small`. It is the accent.
    part('corner', raised.small(path('M60 14L80 34H65A5 5 0 0 1 60 29Z', 'accent'))),
    // Lines of text are pressed into the sheet. 9 units high: still there at 24 px.
    part('line-1', inset(pill(30, 50, 26, 9, 'main'))),
    part('line-2', inset(pill(30, 64, 40, 9, 'main'))),
  ],
  motion: {
    // `reveal` grows from the left by default; the second line starts 120 ms later.
    ...stagger(['line-1', 'line-2'], reveal({ duration: 450 }), 120),
  },
});
```

## 2. `bell-ring`: a pivot, and two parts that answer

**Brief.** An alert. Body: a bell (`base`), with its knob, clapper and a band in `main`. Accent:
sound waves on both sides. Motion: the bell swings from its top; the waves leave.

```ts
import { circle, clip, icon, inset, part, path, raised, rect, stroke, swing, travel } from '@triolet/core';

const body = 'M46 20C34 20 28 30 28 42V56L20 66V71H72V66L64 56V42C64 30 58 20 46 20Z';
const left = ['M10 40L16 43', 'M8 54H15', 'M10 68L16 65'];
const right = ['M82 42L76 45', 'M84 56H77', 'M82 69L76 66'];

export default icon({
  name: 'bell-ring',
  category: 'notifications',
  keywords: ['bell', 'alert', 'notification', 'ring', 'alarm', 'cloche', 'alerte', 'sonnerie'],
  gesture: 'The bell rings from its top and the sound waves leave on both sides.',
  draw: [
    part(
      'bell',
      // Drawn first, so behind the body: the knob on top, the clapper under the mouth.
      raised(circle(46, 17, 4.5, 'main'), circle(46, 75, 7.5, 'main')),
      // `outline: 3` thickens and rounds the silhouette.
      raised(path(body, 'base', { outline: 3 })),
      // A band of the main colour, cut to the outline of the bell.
      clip(path(body, 'base'), inset(rect(14, 58, 64, 8, 0, 'main'))),
    ),
    // Lines are `stroke`s; three in one layer share one relief.
    part('waves-left', raised.small(left.map((d) => stroke(d, 'accent', 4)))),
    part('waves-right', raised.small(right.map((d) => stroke(d, 'accent', 4)))),
  ],
  motion: {
    // The pivot is the top of the part's own box: the bell hangs from there.
    bell: swing({ angles: [14, -11, 7, -4], at: [0.15, 0.35, 0.55, 0.75], pivot: 'top', duration: 800 }),
    // The waves arrive from 4 units inwards, fading in, twice.
    'waves-left': travel({ from: [4, 0], fade: true, duration: 400, ease: 'outSoft', iterations: 2 }),
    'waves-right': travel({ from: [-4, 0], fade: true, duration: 400, ease: 'outSoft', iterations: 2 }),
  },
});
```

## 3. `credit-card`: one object in two colours, nested parts

**Brief.** A payment. Body: a card (`main`, wide keyline) with its light stripe. Accent: the
chip. Motion: the card tilts, then the chip answers.

```ts
import { circle, icon, inset, part, pill, pop, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'credit-card',
  category: 'finance',
  keywords: ['payment', 'card', 'credit card', 'pay', 'bank', 'checkout', 'paiement', 'carte'],
  gesture: 'The card tilts and its chip answers.',
  draw: [
    part(
      'card',
      // Two shapes in ONE raised layer: one object, one relief.
      raised(rect(12, 22, 72, 52, 11, 'main'), rect(12, 35, 72, 9, 0, 'base')),
      inset(pill(22, 56, 22, 7, 'base')),
      // The chip is a part inside the card: it tilts with it, then pops on its own.
      part('chip', inset(circle(70, 59.5, 6, 'accent'))),
    ),
  ],
  motion: {
    card: swing({ angles: [-7, 3], at: [0.35, 0.7], duration: 600, ease: 'out' }),
    chip: pop({ duration: 450, delay: 150 }),
  },
});
```

## 4. `pin-alert`: a badge

**Brief.** A report on a map. Body: a pin (`main`) with its light hole. Accent: an alert badge
on its shoulder. Motion: the pin plants itself, then the badge lights up.

The badge is always the same three layers: a `gap` disc 3 units larger, the `accent` disc
(`raised.small`), the ink in `on`.

```ts
part(
  'badge',
  plain(circle(69, 21, 16, 'gap')),
  raised.small(circle(69, 21, 13, 'accent')),
  plain(rect(67.3, 12.5, 3.4, 10.5, 1.7, 'on'), circle(69, 27.8, 2, 'on')),
),
```

```ts
motion: {
  pin: bounce({ duration: 700 }),
  badge: pop({ duration: 450, delay: 200 }),
},
```

## 5. `ballot-box`: a clip, and tracks by hand

**Brief.** A vote. Body: a box (`main`) and its lid (`base`) with a slot. Accent: the ballot.
Motion: the ballot drops into the slot, then a new one comes up.

```ts
import { clip, icon, inset, part, pill, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'ballot-box',
  category: 'civic',
  keywords: ['vote', 'ballot', 'election', 'poll', 'urn', 'urne', 'bulletin', 'scrutin'],
  gesture: 'The ballot drops into the box, then a new one comes up.',
  draw: [
    raised(rect(18, 44, 60, 40, 8, 'main')),
    raised(rect(14, 35, 68, 15, 7, 'base')),
    inset(pill(31, 39.5, 34, 6, 'main')),
    // Everything under y = 42.5 (the middle of the slot) is cut: the ballot goes INTO the box.
    clip(rect(0, 0, 96, 42.5, 0, 'base'), part('ballot', raised.small(rect(38, 12, 20, 36, 3, 'accent', { rotate: [18, 48, 30] })))),
  ],
  motion: {
    // Down into the slot, gone, then back from just above its place. Every track ends at rest.
    ballot: tracks(
      { duration: 900, ease: 'inOut' },
      {
        x: [[0.5, 3], [0.51, 3], [0.52, -2], [1, 0]],
        y: [[0.5, 15], [0.51, 15], [0.52, -6], [1, 0]],
        opacity: [[0.5, 1], [0.51, 0], [0.52, 0], [1, 1]],
      },
    ),
  },
});
```

## What these five have in common

- Five or six shapes, no more.
- One body that fills its keyline shape, one accent, one or two recessed details.
- The part that moves is the part that carries the meaning.
- Numbers are whole or halves; corners are round; lines are thick.
