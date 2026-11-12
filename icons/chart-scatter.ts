import { circle, icon, inset, part, pop, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'chart-scatter',
  category: 'data',
  keywords: ['chart', 'scatter', 'plot', 'points', 'data', 'statistics', 'nuage de points', 'graphique'],
  gesture: 'The points appear one after the other; the last one is the odd one out.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    inset(stroke('M28 26V68H70', 'main', 5)),
    part('point-1', raised.small(circle(40, 56, 5, 'main'))),
    part('point-2', raised.small(circle(49, 44, 5, 'main'))),
    part('point-3', raised.small(circle(60, 50, 5, 'main'))),
    part('point-4', raised.small(circle(64, 31, 6, 'accent'))),
  ],
  motion: {
    ...stagger(['point-1', 'point-2', 'point-3', 'point-4'], pop({ duration: 380 }), 110),
  },
});
