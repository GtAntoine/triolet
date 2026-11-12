import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-a',
  category: 'documents',
  keywords: ['letter', 'a', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter A writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M34 58L48 24L62 58M39.5 46H56.5', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
