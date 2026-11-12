import { icon, inset, part, nudge, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'layout-sidebar-right-collapse',
  category: 'interface',
  keywords: ['layout', 'sidebar', 'collapse', 'hide', 'right', 'panel', 'replier', 'barre latérale'],
  gesture: 'The chevron pushes the sidebar away.',
  draw: [
    raised(rect(12, 16, 72, 64, 12, 'base')),
    inset(rect(60, 24, 16, 48, 5, 'main')),
    part('chevron', inset(stroke('M30 35L43 48L30 61', 'accent', 7.5))),
  ],
  motion: {
    chevron: nudge({ x: 5, settle: true, duration: 500 }),
  },
});
