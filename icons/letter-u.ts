import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-u',
  category: 'documents',
  keywords: ['letter', 'u', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter U writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M35 24V45A13 13 0 0 0 61 45V24', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
