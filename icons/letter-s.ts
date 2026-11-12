import { draw, icon, inset, part, pill, plain, raised, rect, scalePath, stroke } from '@triolet/core';

export default icon({
  name: 'letter-s',
  category: 'documents',
  keywords: ['letter', 's', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter S writes itself above its line.',
  draw: [
    // A key: a light rim, a dark face, the letter in white above its line.
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('letter', plain(stroke(scalePath('M60 31C58 26 53 24 48 24C41 24 36 28 36 33C36 46 60 37 60 50C60 55 55 58 48 58C42 58 37 55 35 50', 0.84, 48, 43), 'on', 6.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
