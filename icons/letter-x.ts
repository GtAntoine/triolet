import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-x',
  category: 'documents',
  keywords: ['letter', 'x', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter X writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M35 24L61 58M61 24L35 58', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
