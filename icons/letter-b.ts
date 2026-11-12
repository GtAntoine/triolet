import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-b',
  category: 'documents',
  keywords: ['letter', 'b', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter B writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M36 24V58M36 24H50A8.5 8.5 0 0 1 50 41H36M36 41H52A8.5 8.5 0 0 1 52 58H36', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
