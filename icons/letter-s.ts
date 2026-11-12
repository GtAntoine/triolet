import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-s',
  category: 'documents',
  keywords: ['letter', 's', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter S writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M60 31C58 26 53 24 48 24C41 24 36 28 36 33C36 46 60 37 60 50C60 55 55 58 48 58C42 58 37 55 35 50', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
