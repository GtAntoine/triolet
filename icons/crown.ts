import { circle, icon, inset, part, path, pill, pop, raised, resize, stagger } from '@triolet/core';

export default icon({
  name: 'crown',
  category: 'social',
  keywords: ['crown', 'king', 'queen', 'premium', 'vip', 'royal', 'couronne', 'reine'],
  gesture: 'The three jewels shine one after the other.',
  draw: [
    raised(path('M16 34L32 50L48 26L64 50L80 34L74 70H22Z', 'main', { outline: 5 })),
    ...resize([inset(path('M16 34L32 50L48 26L64 50L80 34L74 70H22Z', 'base', { outline: 5 }))], 0.62, { about: [48, 50], move: [0, -3] }),
    raised.small(pill(18, 64, 60, 15, 'main')),
    part('jewel-1', inset(circle(30, 72, 3.5, 'base'))),
    part('jewel-2', inset(circle(48, 71.5, 6.5, 'accent'))),
    part('jewel-3', inset(circle(66, 72, 3.5, 'base'))),
  ],
  motion: {
    ...stagger(['jewel-1', 'jewel-2', 'jewel-3'], pop({ scale: 1.5, duration: 400 }), 120),
  },
});
