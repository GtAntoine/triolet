import { circle, icon, inset, part, pop, raised, rect, reveal, stroke } from '@triolet/core';

export default icon({
  name: 'minus',
  category: 'interface',
  keywords: ['minus', 'remove', 'less', 'subtract', 'reduce', 'collapse', 'moins', 'retirer'],
  gesture: 'The bar stretches out, then the dot pops.',
  draw: [
    raised(rect(12, 28, 72, 40, 20, 'base')),
    part('mark', raised.small(stroke('M29 48H56', 'main', 9))),
    part('dot', inset(circle(70, 48, 8, 'accent'))),
  ],
  motion: {
    mark: reveal({ duration: 450 }),
    dot: pop({ duration: 400, delay: 300 }),
  },
});
