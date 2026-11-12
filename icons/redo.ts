import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'redo',
  category: 'interface',
  keywords: ['redo', 'forward', 'repeat', 'again', 'next', 'edit', 'rétablir', 'refaire'],
  gesture: 'The arrow pushes forward and comes back.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    raised.small(stroke('M60 44H41A13 13 0 0 0 41 70H56', 'main', 7)),
    part('arrow', raised.small(stroke('M51 30L65 44L51 58', 'accent', 7.5))),
  ],
  motion: {
    arrow: nudge({ x: 5, settle: true, duration: 480 }),
  },
});
