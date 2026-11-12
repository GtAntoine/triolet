import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-d',
  category: 'documents',
  keywords: ['letter', 'd', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter D writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M36 24V58H44A17 17 0 0 0 44 24Z', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
