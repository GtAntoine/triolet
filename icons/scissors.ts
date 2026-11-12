import { circle, icon, part, raised, ring, stroke, swing } from '@triolet/core';

export default icon({
  name: 'scissors',
  category: 'design',
  keywords: ['scissors', 'cut', 'trim', 'crop', 'clip', 'snip', 'ciseaux', 'couper'],
  gesture: 'The scissors open and close.',
  draw: [
    part('blade-1', raised(stroke('M34 62L72 16', 'base', 8)), raised.small(ring(27, 70, 9, 'main', 7))),
    part('blade-2', raised(stroke('M54 64L26 16', 'base', 8)), raised.small(ring(61, 73, 9, 'main', 7))),
    raised.small(circle(45, 48, 4.5, 'accent')),
  ],
  motion: {
    'blade-1': swing({ angles: [-10, 4], at: [0.4, 0.75], pivot: [45, 48], duration: 600 }),
    'blade-2': swing({ angles: [10, -4], at: [0.4, 0.75], pivot: [45, 48], duration: 600 }),
  },
});
