import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'letter-j',
  category: 'documents',
  keywords: ['letter', 'j', 'alphabet', 'character', 'text', 'initial', 'lettre', 'caractère'],
  gesture: 'The letter J writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(30, 66, 36, 6.5, 'accent')),
    part('letter', plain(stroke('M56 24V47A10 10 0 0 1 36 47', 'main', 7.5))),
  ],
  motion: {
    letter: draw({ duration: 600 }),
  },
});
