import { circle, icon, inset, part, pop, raised, rect, spin, stroke } from '@triolet/core';

export default icon({
  name: 'x',
  category: 'interface',
  keywords: ['close', 'cancel', 'remove', 'cross', 'dismiss', 'exit', 'fermer', 'annuler'],
  gesture: 'The cross turns into place, then the dot pops.',
  draw: [
    raised(rect(16, 16, 64, 64, 17, 'base')),
    part('mark', raised.small(stroke('M35 37L59 61M59 37L35 61', 'main', 9))),
    part('dot', inset(circle(66, 30, 8, 'accent'))),
  ],
  motion: {
    mark: spin({ from: -90, duration: 500, ease: 'out', pivot: [47, 49] }),
    dot: pop({ duration: 400, delay: 300 }),
  },
});
