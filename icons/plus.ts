import { circle, icon, inset, part, pop, raised, rect, spin, stroke } from '@triolet/core';

export default icon({
  name: 'plus',
  category: 'interface',
  keywords: ['plus', 'add', 'new', 'create', 'more', 'insert', 'ajouter', 'nouveau'],
  gesture: 'The plus turns into place, then the dot pops.',
  draw: [
    raised(rect(16, 16, 64, 64, 17, 'base')),
    part('mark', raised.small(stroke('M46 30V64M29 47H63', 'main', 9))),
    part('dot', inset(circle(66, 66, 4.5, 'accent'))),
  ],
  motion: {
    mark: spin({ from: -90, duration: 500, ease: 'out', pivot: [46, 47] }),
    dot: pop({ duration: 400, delay: 300 }),
  },
});
