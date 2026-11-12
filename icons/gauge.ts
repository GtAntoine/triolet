import { circle, icon, part, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'gauge',
  category: 'data',
  keywords: ['gauge', 'speed', 'meter', 'dashboard', 'performance', 'level', 'jauge', 'vitesse'],
  gesture: 'The needle climbs and settles.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised.small(stroke('M27 62A25 25 0 0 1 66 30', 'main', 7.5)),
    raised.small(stroke('M70 40A25 25 0 0 1 69 62', 'accent', 7.5)),
    part('needle', raised.small(stroke('M48 54L60 40', 'accent', 6))),
    raised.small(circle(48, 54, 6, 'main')),
  ],
  motion: {
    needle: swing({ angles: [-70, 12, -6, 0], at: [0, 0.6, 0.8, 1], duration: 900, pivot: [48, 54] }),
  },
});
