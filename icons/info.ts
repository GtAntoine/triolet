import { circle, icon, inset, part, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'info',
  category: 'notifications',
  keywords: ['info', 'information', 'about', 'details', 'tip', 'note', 'renseignement', 'détails'],
  gesture: 'The dot of the i pops.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    inset(circle(48, 48, 29, 'base')),
    inset(rect(44, 43, 8, 23, 4, 'main')),
    part('dot', inset(circle(48, 32, 5, 'accent'))),
  ],
  motion: {
    dot: pop({ scale: 1.5, duration: 450 }),
  },
});
