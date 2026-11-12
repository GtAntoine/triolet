import { circle, icon, nudge, part, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'bike',
  category: 'places',
  keywords: ['bike', 'bicycle', 'cycle', 'ride', 'cycling', 'mobility', 'vélo', 'bicyclette'],
  gesture: 'The bike rolls forward and comes back.',
  draw: [
    part(
      'bike',
      raised(circle(25, 60, 19, 'base'), circle(71, 60, 19, 'base')),
      raised.small(ring(25, 60, 15.5, 'main', 4), ring(71, 60, 15.5, 'main', 4)),
      raised.small(stroke('M25 60L40 37H61L71 60M40 37L50 60H25M61 37L58 27', 'main', 4)),
      // The saddle and the handlebar: the accent.
      raised.small(stroke('M33 34H46', 'accent', 6.5), stroke('M52 26H66', 'accent', 6.5)),
    ),
  ],
  motion: {
    bike: nudge({ x: 6, settle: true, duration: 650 }),
  },
});
