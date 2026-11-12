import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'chevron-up',
  category: 'arrows',
  keywords: ['chevron', 'up', 'collapse', 'caret', 'top', 'close', 'haut', 'replier'],
  gesture: 'The chevron pushes up and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The dot that follows the chevron is the accent.
    part('chevron', raised.small(stroke('M30 53L48 35L66 53', 'main', 9)), raised.small(circle(48, 63, 9, 'accent'))),
  ],
  motion: {
    chevron: nudge({ y: -6, settle: true, duration: 500 }),
  },
});
