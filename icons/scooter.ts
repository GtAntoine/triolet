import { circle, icon, inset, nudge, part, pill, raised, stroke } from '@triolet/core';

export default icon({
  name: 'scooter',
  category: 'places',
  keywords: ['scooter', 'kick', 'ride', 'mobility', 'urban', 'transport', 'trottinette', 'mobilité'],
  gesture: 'The scooter rolls forward and comes back.',
  draw: [
    part(
      'scooter',
      // The column and its handlebar: the accent.
      raised.small(stroke('M70 70L61 22', 'main', 6)),
      raised.small(pill(46, 14, 26, 9, 'accent')),
      // The deck, then the two wheels.
      raised(pill(20, 60, 46, 11, 'base')),
      raised.small(circle(22, 74, 10, 'main'), circle(72, 74, 10, 'main')),
      inset(circle(22, 74, 4, 'base'), circle(72, 74, 4, 'base')),
    ),
  ],
  motion: {
    scooter: nudge({ x: 6, settle: true, duration: 650 }),
  },
});
