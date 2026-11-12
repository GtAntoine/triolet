import { circle, icon, part, pop, raised, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'percent',
  category: 'finance',
  keywords: ['percent', 'discount', 'rate', 'sale', 'ratio', 'promotion', 'pourcentage', 'réduction'],
  gesture: 'The two dots pop on each side of the bar.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised.small(stroke('M62 30L34 66', 'main', 10)),
    part('dot-1', raised.small(circle(34, 35, 7, 'accent'))),
    part('dot-2', raised.small(circle(62, 61, 7, 'accent'))),
  ],
  motion: {
    ...stagger(['dot-1', 'dot-2'], pop({ duration: 400 }), 140),
  },
});
