import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'chevron-right',
  category: 'arrows',
  keywords: ['chevron', 'right', 'next', 'forward', 'caret', 'expand', 'suivant', 'droite'],
  gesture: 'The chevron pushes to the right and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The dot that follows the chevron is the accent.
    part('chevron', raised.small(stroke('M43 30L61 48L43 66', 'main', 9)), raised.small(circle(33, 48, 5.5, 'accent'))),
  ],
  motion: {
    chevron: nudge({ x: 6, settle: true, duration: 500 }),
  },
});
