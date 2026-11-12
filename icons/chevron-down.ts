import { circle, icon, nudge, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'chevron-down',
  aliases: ['down-chevron'],
  category: 'arrows',
  keywords: ['chevron', 'down', 'expand', 'caret', 'dropdown', 'open', 'bas', 'déplier'],
  gesture: 'The chevron pushes down and comes back.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    // The dot that follows the chevron is the accent.
    part('chevron', raised.small(stroke('M30 43L48 61L66 43', 'main', 9)), raised.small(circle(48, 33, 9, 'accent'))),
  ],
  motion: {
    chevron: nudge({ y: 6, settle: true, duration: 500 }),
  },
});
