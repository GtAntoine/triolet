import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-left',
  category: 'arrows',
  keywords: ['arrow', 'left', 'back', 'previous', 'return', 'undo', 'précédent', 'gauche'],
  gesture: 'The arrow pushes back and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The tail of the arrow is the accent.
    part('arrow', raised.small(stroke('M66 48H30M44 32L28 48L44 64', 'main', 9)), raised.small(stroke('M57 48H67', 'accent', 9))),
  ],
  motion: {
    arrow: nudge({ x: -6, settle: true, duration: 500 }),
  },
});
