import { circle, icon, inset, nudge, part, path, pill, raised, rect, resize } from '@triolet/core';

export default icon({
  name: 'car',
  category: 'places',
  keywords: ['car', 'vehicle', 'drive', 'auto', 'transport', 'taxi', 'voiture', 'trajet'],
  gesture: 'The car drives off and comes back.',
  draw: resize(
    [
      part(
        'car',
        // The cabin and its two windows.
        raised(path('M24 46L33 28A6 6 0 0 1 38.5 24H58.5A6 6 0 0 1 64 28L73 46Z', 'main', { outline: 2 })),
        inset(path('M34 43L40 31H46V43Z', 'soft'), path('M51 31H57L63 43H51Z', 'soft')),
        // The body, with its headlight.
        raised(rect(8, 42, 80, 26, 12, 'base')),
        inset(pill(75, 49, 9, 8, 'accent')),
        inset(pill(40, 50, 12, 5, 'mid')),
        raised.small(circle(28, 68, 9.5, 'main'), circle(68, 68, 9.5, 'main')),
        inset(circle(28, 68, 3.5, 'base'), circle(68, 68, 3.5, 'base')),
      ),
    ],
    0.9,
    { move: [0, -3] },
  ),
  motion: {
    car: nudge({ x: 6, settle: true, duration: 650 }),
  },
});
