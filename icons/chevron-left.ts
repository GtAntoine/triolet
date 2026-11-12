import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'chevron-left',
  category: 'arrows',
  keywords: ['chevron', 'left', 'back', 'previous', 'caret', 'collapse', 'précédent', 'gauche'],
  gesture: 'The chevron pushes to the left and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The dot that follows the chevron is the accent.
    part('chevron', raised.small(stroke('M53 30L35 48L53 66', 'main', 9)), raised.small(circle(63, 48, 9, 'accent'))),
  ],
  motion: {
    chevron: nudge({ x: -6, settle: true, duration: 500 }),
  },
});
