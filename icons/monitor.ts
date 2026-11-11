import { icon, inset, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'monitor',
  category: 'devices',
  keywords: ['monitor', 'screen', 'desktop', 'computer', 'display', 'pc', 'écran', 'ordinateur'],
  gesture: 'The lines appear on the screen one after the other.',
  draw: [
    raised(rect(42, 62, 12, 16, 2, 'main'), pill(30, 76, 36, 8, 'main')),
    raised(rect(10, 14, 76, 52, 9, 'main')),
    inset(rect(16, 20, 64, 40, 5, 'base')),
    part('line-1', inset(pill(23, 27, 24, 7, 'accent'))),
    part('line-2', inset(pill(23, 39, 44, 6, 'mid'))),
    part('line-3', inset(pill(23, 49, 32, 6, 'mid'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2', 'line-3'], reveal({ duration: 400 }), 100),
  },
});
