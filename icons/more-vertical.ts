import { circle, icon, part, pill, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'more-vertical',
  aliases: ['dots-vertical'],
  category: 'interface',
  keywords: ['more', 'kebab', 'dots', 'options', 'vertical', 'actions', 'plus', 'trois points'],
  gesture: 'The three dots pop, from top to bottom.',
  draw: [
    raised(pill(26, 10, 44, 76, 'base')),
    part('dot-1', raised.small(circle(48, 27, 8.5, 'main'))),
    part('dot-2', raised.small(circle(48, 48, 9.5, 'accent'))),
    part('dot-3', raised.small(circle(48, 69, 8.5, 'main'))),
  ],
  motion: {
    ...stagger(['dot-1', 'dot-2', 'dot-3'], pop({ scale: 1.3, duration: 380 }), 110),
  },
});
