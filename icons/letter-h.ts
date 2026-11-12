import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-h',
  category: 'documents',
  keywords: ['letter', 'h', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter H writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M35 24V58M61 24V58M35 41H61', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
