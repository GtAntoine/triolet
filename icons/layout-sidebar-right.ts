import { icon, inset, part, pill, raised, rect, reveal } from '@triolet/core';

export default icon({
  name: 'layout-sidebar-right',
  category: 'interface',
  keywords: ['layout', 'sidebar', 'right', 'panel', 'drawer', 'aside', 'barre latérale', 'panneau'],
  gesture: 'The sidebar slides in from the right.',
  draw: [
    raised(rect(12, 16, 72, 64, 12, 'base')),
    inset(rect(20, 24, 34, 14, 5, 'accent')),
    inset(pill(20, 46, 34, 6, 'mid'), pill(20, 58, 24, 6, 'mid')),
    part('sidebar', inset(rect(60, 24, 16, 48, 5, 'main'))),
  ],
  motion: {
    sidebar: reveal({ from: 'right', duration: 450 }),
  },
});
