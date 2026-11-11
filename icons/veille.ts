import { circle, icon, inset, part, pill, raised, rect, ring, stroke, travel } from '@triolet/core';

export default icon({
  name: 'veille',
  category: 'data',
  keywords: ['watch', 'monitor', 'search', 'magnifier', 'review', 'inspect', 'veille', 'loupe'],
  gesture: 'The magnifier scans what is published and comes back.',
  draw: [
    raised(rect(10, 12, 58, 64, 8, 'base')),
    ([
      [22, 36],
      [31, 26],
      [40, 32],
      [49, 20],
    ] as const).map(([y, w]) => inset(pill(18, y, w, 5, 'mid'))),
    part(
      'magnifier',
      inset(circle(60, 58, 13.5, 'soft')),
      raised(ring(60, 58, 15.5, 'main', 6)),
      raised.small(stroke('M72.5 70.5L83 81', 'accent', 9)),
    ),
  ],
  motion: {
    magnifier: travel({
      via: [
        [-20, -22, 0.35],
        [-6, -12, 0.65],
      ],
      duration: 1100,
    }),
  },
});
