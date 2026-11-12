import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-y',
  category: 'documents',
  keywords: ['letter', 'y', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter Y writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M34 24L48 42L62 24M48 42V58', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
