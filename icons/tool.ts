import { circle, icon, inset, part, path, raised, rect, stroke, swing } from '@triolet/core';
import { polygonPath } from './_shared.ts';

export default icon({
  name: 'tool',
  category: 'work',
  keywords: ['tool', 'wrench', 'repair', 'fix', 'maintenance', 'settings', 'outil', 'réparer'],
  gesture: 'The wrench turns the bolt.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'wrench',
      raised.small(stroke('M36 60L58 38', 'main', 10), circle(63, 33, 13, 'main')),
      inset(rect(62, 17, 9, 15, 2, 'base', { rotate: [45, 63, 33] })),
    ),
    raised.small(path(polygonPath(32, 64, 9, 6), 'accent', { outline: 2 })),
  ],
  motion: {
    wrench: swing({ angles: [-20, 6], at: [0.4, 0.75], pivot: [32, 64], duration: 700 }),
  },
});
