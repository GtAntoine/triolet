import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-w',
  category: 'documents',
  keywords: ['letter', 'w', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter W writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M31 24L39 58L48 34L57 58L65 24', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
