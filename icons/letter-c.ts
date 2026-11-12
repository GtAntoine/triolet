import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-c',
  category: 'documents',
  keywords: ['letter', 'c', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter C writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M61 32A15 17 0 1 0 61 50', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
