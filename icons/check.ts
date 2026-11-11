import { circle, draw, icon, inset, part, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'check',
  category: 'interface',
  keywords: ['check', 'done', 'ok', 'valid', 'confirm', 'success', 'valider', 'coche'],
  gesture: 'The check draws itself, then the dot pops.',
  draw: [
    raised(rect(16, 16, 64, 64, 17, 'base')),
    part('mark', raised.small(stroke('M31 49L43 61L65 36', 'main', 9))),
    part('dot', inset(circle(66, 66, 4.5, 'accent'))),
  ],
  motion: {
    mark: draw({ duration: 450 }),
    dot: pop({ duration: 400, delay: 400 }),
  },
});
