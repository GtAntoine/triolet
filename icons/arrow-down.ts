import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-down',
  category: 'arrows',
  keywords: ['arrow', 'down', 'bottom', 'fall', 'decrease', 'scroll down', 'bas', 'descendre'],
  gesture: 'The arrow pushes down and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The tail of the arrow is the accent.
    part('arrow', raised.small(stroke('M48 30V66M32 52L48 68L64 52', 'main', 9)), raised.small(stroke('M48 29V33', 'accent', 9))),
  ],
  motion: {
    arrow: nudge({ y: 6, settle: true, duration: 500 }),
  },
});
