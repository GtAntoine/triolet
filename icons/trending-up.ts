import { draw, icon, inset, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'trending-up',
  category: 'data',
  keywords: ['trending', 'up', 'growth', 'increase', 'rise', 'stats', 'hausse', 'croissance'],
  gesture: 'The line climbs, then its arrow draws itself.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(26, 66, 44, 5, 'main')),
    part('line', raised.small(stroke('M25 62L40 46L50 54L68 36', 'main', 8))),
    part('arrow', raised.small(stroke('M54 33H69V48', 'accent', 7.5))),
  ],
  motion: {
    line: draw({ duration: 550 }),
    arrow: draw({ delay: 450, duration: 300 }),
  },
});
