import { circle, draw, icon, inset, part, pill, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'chart-line',
  category: 'data',
  keywords: ['chart', 'line', 'graph', 'trend', 'statistics', 'analytics', 'courbe', 'graphique'],
  gesture: 'The line draws itself from point to point, then the last point pops.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    inset(pill(26, 65, 44, 5, 'main')),
    part('line', raised.small(stroke('M27 54L40 41L52 49L68 30', 'main', 6.5))),
    part('point', raised.small(circle(68, 30, 6.5, 'accent'))),
  ],
  motion: {
    line: draw({ duration: 600 }),
    point: pop({ delay: 550, duration: 400 }),
  },
});
