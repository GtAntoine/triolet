import { circle, icon, inset, part, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'lightbulb',
  category: 'work',
  keywords: ['lightbulb', 'idea', 'light', 'tip', 'insight', 'innovation', 'ampoule', 'idée'],
  gesture: 'The bulb lights up.',
  draw: [
    raised.small(rect(38, 62, 20, 12, 3, 'main'), rect(42, 74, 12, 8, 3, 'main')),
    raised(circle(48, 38, 25, 'base'), rect(38, 54, 20, 12, 3, 'base')),
    part('glow', inset(circle(48, 38, 8, 'accent'))),
  ],
  motion: {
    glow: pop({ scale: 1.6, duration: 600 }),
  },
});
