import { circle, draw, icon, part, raised, stagger, stroke, resize } from '@triolet/core';

export default icon({
  name: 'rainbow',
  category: 'weather',
  keywords: ['rainbow', 'colors', 'weather', 'pride', 'sky', 'hope', 'arc-en-ciel', 'couleurs'],
  gesture: 'The three arcs draw themselves, from the outside in.',
  draw: resize(
    [
    part('arc-1', raised.small(stroke('M16 66A32 32 0 0 1 80 66', 'main', 9))),
    part('arc-2', raised.small(stroke('M27 66A21 21 0 0 1 69 66', 'base', 9))),
    part('arc-3', raised.small(stroke('M38 66A10 10 0 0 1 58 66', 'accent', 9))),
    // A cloud at each foot.
    raised(circle(14, 70, 9, 'base'), circle(26, 72, 8, 'base'), circle(20, 64, 7, 'base')),
    raised(circle(82, 70, 9, 'base'), circle(70, 72, 8, 'base'), circle(76, 64, 7, 'base')),
    ],
    0.92,
    { move: [0, -7] },
  ),
  motion: {
    ...stagger(['arc-1', 'arc-2', 'arc-3'], draw({ duration: 500 }), 130),
  },
});
