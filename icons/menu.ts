import { icon, inset, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'menu',
  category: 'interface',
  keywords: ['menu', 'hamburger', 'navigation', 'list', 'sidebar', 'options', 'burger', 'navigation mobile'],
  gesture: 'The three bars write themselves, one after the other.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part('bar-1', inset(pill(28, 28, 40, 9, 'accent'))),
    part('bar-2', inset(pill(28, 43.5, 40, 9, 'main'))),
    part('bar-3', inset(pill(28, 59, 40, 9, 'main'))),
  ],
  motion: {
    ...stagger(['bar-1', 'bar-2', 'bar-3'], reveal({ duration: 380 }), 90),
  },
});
