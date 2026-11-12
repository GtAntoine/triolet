import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-p',
  category: 'documents',
  keywords: ['letter', 'p', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter P writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M36 58V24H50A9.5 9.5 0 0 1 50 43H36', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
