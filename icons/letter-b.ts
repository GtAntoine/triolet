import { draw, icon, inset, part, pill, plain, raised, rect, scalePath, stroke } from '@triolet/core';

export default icon({
  name: 'letter-b',
  category: 'documents',
  keywords: ['letter', 'b', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter B writes itself above its line.',
  draw: [
    // A key: a light rim, a dark face, the letter in white above its line.
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('letter', plain(stroke(scalePath('M36 24V58M36 24H50A8.5 8.5 0 0 1 50 41H36M36 41H52A8.5 8.5 0 0 1 52 58H36', 0.84, 48, 43), 'on', 6.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
