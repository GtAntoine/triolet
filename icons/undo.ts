import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'undo',
  category: 'interface',
  keywords: ['undo', 'back', 'revert', 'cancel', 'previous', 'edit', 'annuler', 'retour'],
  gesture: 'The arrow pulls back and comes back.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    raised.small(stroke('M36 44H55A13 13 0 0 1 55 70H40', 'main', 7)),
    part('arrow', raised.small(stroke('M45 30L31 44L45 58', 'accent', 7.5))),
  ],
  motion: {
    arrow: nudge({ x: -5, settle: true, duration: 480 }),
  },
});
