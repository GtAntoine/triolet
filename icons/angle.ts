import { draw, icon, part, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'angle',
  category: 'design',
  keywords: ['angle', 'degree', 'geometry', 'measure', 'corner', 'math', 'degré', 'géométrie'],
  gesture: 'The arc of the angle draws itself.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    raised.small(stroke('M70 66H28L58 28', 'main', 6.5)),
    part('arc', plain(stroke('M52 66A24 24 0 0 0 42.9 47.2', 'accent', 5.5))),
  ],
  motion: {
    arc: draw({ duration: 500 }),
  },
});
