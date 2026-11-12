import { icon, inset, part, pop, raised, rect, stagger } from '@triolet/core';

export default icon({
  name: 'layout-dashboard',
  category: 'interface',
  keywords: ['dashboard', 'layout', 'panels', 'widgets', 'overview', 'admin', 'tableau de bord', 'disposition'],
  gesture: 'The four panels pop, one after the other.',
  draw: [
    raised(rect(12, 16, 72, 64, 12, 'base')),
    part('panel-1', inset(rect(20, 24, 25, 28, 5, 'main'))),
    part('panel-2', inset(rect(51, 24, 25, 16, 5, 'mid'))),
    part('panel-3', inset(rect(20, 58, 25, 14, 5, 'accent'))),
    part('panel-4', inset(rect(51, 46, 25, 26, 5, 'main'))),
  ],
  motion: {
    ...stagger(['panel-1', 'panel-2', 'panel-3', 'panel-4'], pop({ scale: 1.1, duration: 360 }), 90),
  },
});
