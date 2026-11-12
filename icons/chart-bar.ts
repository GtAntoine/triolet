import { icon, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'chart-bar',
  category: 'data',
  keywords: ['chart', 'bar chart', 'statistics', 'analytics', 'report', 'graph', 'graphique', 'statistiques'],
  gesture: 'The bars rise one after the other.',
  draw: [
    raised(pill(12, 72, 72, 8, 'main')),
    part('bar-1', raised(rect(19, 46, 16, 28, 5, 'base'))),
    part('bar-2', raised(rect(40, 52, 16, 22, 5, 'accent'))),
    part('bar-3', raised(rect(61, 20, 16, 54, 5, 'main'))),
  ],
  motion: {
    ...stagger(['bar-1', 'bar-2', 'bar-3'], reveal({ from: 'bottom', duration: 500 }), 90),
  },
});
