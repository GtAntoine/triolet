import { circle, icon, part, pill, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'divide',
  category: 'interface',
  keywords: ['divide', 'division', 'math', 'split', 'calculate', 'operator', 'diviser', 'calcul'],
  gesture: 'The two dots pop on each side of the bar.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    raised.small(pill(28, 43.5, 40, 9, 'main')),
    part('dot-1', raised.small(circle(48, 30, 6, 'accent'))),
    part('dot-2', raised.small(circle(48, 66, 6, 'accent'))),
  ],
  motion: {
    ...stagger(['dot-1', 'dot-2'], pop({ duration: 400 }), 140),
  },
});
