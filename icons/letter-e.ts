import { draw, icon, inset, part, pill, plain, raised, rect, scalePath, stroke } from '@triolet/core';

export default icon({
  name: 'letter-e',
  category: 'documents',
  keywords: ['letter', 'e', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter E writes itself above its line.',
  draw: [
    // A key: a light rim, a dark face, the letter in white above its line.
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('letter', plain(stroke(scalePath('M60 24H36V58H60M36 41H55', 0.84, 48, 43), 'on', 6.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
