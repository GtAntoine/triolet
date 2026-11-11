import { icon, part, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'briefcase',
  category: 'work',
  keywords: ['briefcase', 'work', 'job', 'business', 'office', 'career', 'mallette', 'travail'],
  gesture: 'The clasp of the briefcase snaps.',
  draw: [
    raised.small(stroke('M36 32V25A6 6 0 0 1 42 19H54A6 6 0 0 1 60 25V32', 'main', 6)),
    raised(rect(12, 30, 72, 50, 11, 'base'), rect(12, 48, 72, 9, 0, 'main')),
    part('clasp', raised.small(rect(41, 44, 14, 17, 5, 'accent'))),
  ],
  motion: {
    clasp: pop({ scale: 1.25, duration: 450 }),
  },
});
