import { circle, icon, inset, part, plain, pop, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'help-circle',
  aliases: ['question-mark'],
  category: 'notifications',
  keywords: ['help', 'question', 'faq', 'support', 'unknown', 'ask', 'aide', 'interrogation'],
  gesture: 'The question mark tilts and its dot pops.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    inset(circle(48, 48, 29, 'base')),
    part('mark', plain(stroke('M39.5 40A8.5 8.5 0 1 1 52 47.5C49 49.5 48 51.5 48 55', 'main', 6))),
    part('dot', inset(circle(48, 66, 4.5, 'accent'))),
  ],
  motion: {
    mark: swing({ angles: [-10, 8], pivot: [48, 55], duration: 600 }),
    dot: pop({ scale: 1.5, duration: 400, delay: 250 }),
  },
});
