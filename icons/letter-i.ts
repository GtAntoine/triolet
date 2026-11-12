import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-i',
  category: 'documents',
  keywords: ['letter', 'i', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter I writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M48 24V58M40 24H56M40 58H56', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
