import { circle, icon, inset, part, raised, stroke, travel } from '@triolet/core';

export default icon({
  name: 'search',
  category: 'interface',
  keywords: ['search', 'find', 'magnifier', 'magnifying glass', 'look up', 'zoom', 'recherche', 'loupe'],
  gesture: 'The magnifier looks around and comes back.',
  draw: [
    part(
      'magnifier',
      // The handle is behind the rim.
      raised.small(stroke('M59 59L77 77', 'accent', 10)),
      raised(circle(41, 41, 27, 'main')),
      inset(circle(41, 41, 18, 'soft')),
    ),
  ],
  motion: {
    magnifier: travel({
      via: [
        [-5, -4, 0.3],
        [4, -5, 0.65],
      ],
      duration: 900,
    }),
  },
});
