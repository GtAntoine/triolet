import { circle, icon, inset, nudge, part, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'bus',
  category: 'places',
  keywords: ['bus', 'coach', 'transport', 'public', 'transit', 'commute', 'autobus', 'car'],
  gesture: 'The bus drives off and comes back.',
  draw: [
    part(
      'bus',
      raised(rect(12, 20, 72, 46, 11, 'base')),
      // Four windows, then the coloured stripe.
      inset(rect(19, 27, 12, 14, 3, 'main'), rect(34.5, 27, 12, 14, 3, 'main'), rect(50, 27, 12, 14, 3, 'main'), rect(65.5, 27, 12, 14, 3, 'main')),
      inset(pill(19, 48, 58, 7, 'accent')),
      raised.small(circle(30, 68, 9, 'main'), circle(66, 68, 9, 'main')),
      inset(circle(30, 68, 3.5, 'base'), circle(66, 68, 3.5, 'base')),
    ),
  ],
  motion: {
    bus: nudge({ x: 6, settle: true, duration: 650 }),
  },
});
