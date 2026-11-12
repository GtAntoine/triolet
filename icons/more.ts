import { circle, icon, part, pill, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'more',
  category: 'interface',
  keywords: ['more', 'ellipsis', 'dots', 'options', 'overflow', 'actions', 'plus', 'trois points'],
  gesture: 'The three dots pop, one after the other.',
  draw: [
    raised(pill(10, 26, 76, 44, 'base')),
    part('dot-1', raised.small(circle(27, 48, 8.5, 'main'))),
    part('dot-2', raised.small(circle(48, 48, 9.5, 'accent'))),
    part('dot-3', raised.small(circle(69, 48, 8.5, 'main'))),
  ],
  motion: {
    ...stagger(['dot-1', 'dot-2', 'dot-3'], pop({ scale: 1.3, duration: 380 }), 110),
  },
});
