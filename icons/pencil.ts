import { draw, icon, part, path, plain, raised, stroke, travel, turned } from '@triolet/core';

// The pencil is drawn upright around the origin, then turned and placed.
const piece = (points: readonly (readonly [number, number])[]) => turned(points, 40, 52, 44);

export default icon({
  name: 'pencil',
  category: 'interface',
  keywords: ['pencil', 'edit', 'write', 'draw', 'compose', 'modify', 'crayon', 'modifier'],
  gesture: 'The pencil writes a line.',
  draw: [
    part('line', plain(stroke('M16 82H44', 'main', 5))),
    part(
      'pencil',
      raised(
        path(piece([[-10, -24], [10, -24], [10, 16], [-10, 16]]), 'base'),
        path(piece([[-10, -24], [10, -24], [10, -17], [-10, -17]]), 'main'),
        path(piece([[-10, -36], [10, -36], [10, -24], [-10, -24]]), 'accent'),
        path(piece([[-10, 16], [10, 16], [0, 36]]), 'main'),
              ),
    ),
  ],
  motion: {
    line: draw({ duration: 500, delay: 100 }),
    pencil: travel({
      via: [
        [8, 0, 0.35],
        [14, 2, 0.6],
      ],
      duration: 800,
    }),
  },
});
