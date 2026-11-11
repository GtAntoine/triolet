import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-right',
  category: 'arrows',
  keywords: ['arrow', 'right', 'next', 'forward', 'continue', 'go', 'suivant', 'droite'],
  gesture: 'The arrow pushes forward and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The tail of the arrow is the accent.
    part('arrow', raised.small(stroke('M30 48H66M52 32L68 48L52 64', 'main', 9)), raised.small(stroke('M29 48H33', 'accent', 9))),
  ],
  motion: {
    arrow: nudge({ x: 6, settle: true, duration: 500 }),
  },
});
