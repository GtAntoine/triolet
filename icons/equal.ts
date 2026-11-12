import { circle, icon, part, pill, raised, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'equal',
  category: 'interface',
  keywords: ['equal', 'equals', 'math', 'same', 'result', 'calculate', 'égal', 'calcul'],
  gesture: 'The two bars draw themselves, one after the other.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part('bar-1', raised.small(pill(29, 35, 38, 9, 'main'))),
    part('bar-2', raised.small(pill(29, 52, 38, 9, 'accent'))),
  ],
  motion: {
    ...stagger(['bar-1', 'bar-2'], reveal({ duration: 400 }), 140),
  },
});
