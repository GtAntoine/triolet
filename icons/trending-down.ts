import { draw, icon, inset, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'trending-down',
  category: 'data',
  keywords: ['trending', 'down', 'decline', 'decrease', 'drop', 'stats', 'baisse', 'déclin'],
  gesture: 'The line falls, then its arrow draws itself.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(26, 66, 44, 5, 'main')),
    part('line', raised.small(stroke('M25 34L40 50L50 42L68 60', 'main', 8))),
    part('arrow', raised.small(stroke('M54 63H69V48', 'accent', 7.5))),
  ],
  motion: {
    line: draw({ duration: 550 }),
    arrow: draw({ delay: 450, duration: 300 }),
  },
});
