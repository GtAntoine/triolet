import { icon, inset, part, nudge, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'layout-bottombar-collapse',
  category: 'interface',
  keywords: ['layout', 'bottom bar', 'collapse', 'hide', 'footer', 'panel', 'replier', 'barre du bas'],
  gesture: 'The chevron pushes the bottom bar away.',
  draw: [
    raised(rect(12, 16, 72, 64, 12, 'base')),
    inset(rect(20, 56, 56, 16, 5, 'main')),
    part('chevron', inset(stroke('M35 28L48 41L61 28', 'accent', 7.5))),
  ],
  motion: {
    chevron: nudge({ y: 5, settle: true, duration: 500 }),
  },
});
