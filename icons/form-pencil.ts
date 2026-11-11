import { draw, icon, inset, part, path, pill, plain, raised, rect, resize, stroke, travel, turned } from '@triolet/core';

// The pencil is drawn upright around the origin, then turned and placed.
const angle = 38;
const at = [70, 50] as const;
const piece = (points: readonly (readonly [number, number])[]) => turned(points, angle, at[0], at[1]);

export default icon({
  name: 'form-pencil',
  aliases: ['preparation'],
  category: 'documents',
  keywords: ['form', 'fill in', 'pencil', 'write', 'draft', 'edit', 'préparation', 'crayon'],
  gesture: 'The pencil writes and the box checks itself.',
  draw: resize(
    [
      raised(rect(10, 10, 54, 76, 8, 'base')),
      inset(pill(18, 22, 38, 9, 'main')),
      inset(pill(18, 38, 38, 9, 'soft')),
      inset(rect(18, 57, 13, 13, 3.5, 'main')),
      part('check', plain(stroke('M21.5 63.5L24 66L28 61', 'on', 3))),
      part(
        'pencil',
        raised.small(
          path(piece([[-6, -20], [6, -20], [6, 13], [-6, 13]]), 'accent'),
          path(piece([[-6, -27], [6, -27], [6, -20], [-6, -20]]), 'main'),
          path(piece([[-6, 13], [6, 13], [0, 25]]), 'base'),
          path(piece([[-2.2, 20.6], [2.2, 20.6], [0, 25]]), 'main'),
        ),
      ),
    ],
    0.9,
    { move: [-2.5, 0] },
  ),
  motion: {
    check: draw({ duration: 450, delay: 100 }),
    pencil: travel({
      via: [
        [-4, 2, 0.25],
        [1, -1, 0.5],
        [-3, 3, 0.75],
      ],
      duration: 700,
    }),
  },
});
