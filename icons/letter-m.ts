import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-m',
  category: 'documents',
  keywords: ['letter', 'm', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter M writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M33 58V24L48 44L63 24V58', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
