import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-q',
  category: 'documents',
  keywords: ['letter', 'q', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter Q writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M48 24A15 17 0 1 0 48 58A15 17 0 1 0 48 24ZM54 50L63 60', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
