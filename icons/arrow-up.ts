import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-up',
  category: 'arrows',
  keywords: ['arrow', 'up', 'top', 'rise', 'increase', 'scroll up', 'haut', 'monter'],
  gesture: 'The arrow pushes up and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The tail of the arrow is the accent.
    part('arrow', raised.small(stroke('M48 66V30M32 44L48 28L64 44', 'main', 9)), raised.small(stroke('M48 57V67', 'accent', 9))),
  ],
  motion: {
    arrow: nudge({ y: -6, settle: true, duration: 500 }),
  },
});
