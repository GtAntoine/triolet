import { circle, draw, icon, part, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'at-sign',
  category: 'communication',
  keywords: ['at', 'email', 'mention', 'address', 'handle', 'username', 'arobase', 'adresse'],
  gesture: 'The tail of the sign draws itself around its centre.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised.small(ring(48, 48, 9, 'accent', 6.5)),
    part('tail', raised.small(stroke('M57 39V52A7 7 0 0 0 71 52V48A23 23 0 1 0 60 67.6', 'main', 6.5))),
  ],
  motion: {
    tail: draw({ duration: 700 }),
  },
});
