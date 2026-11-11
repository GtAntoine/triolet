import { circle, icon, part, path, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'graduation-cap',
  category: 'education',
  keywords: ['graduation', 'education', 'school', 'student', 'degree', 'learn', 'diplôme', 'école'],
  gesture: 'The tassel swings from the corner of the cap.',
  draw: [
    raised(path('M27 46V62C27 71 69 71 69 62V46L48 56Z', 'base', { outline: 3 })),
    raised(path('M48 24L82 40L48 56L14 40Z', 'main', { outline: 4 })),
    part('tassel', raised.small(stroke('M82 40V58', 'accent', 4), circle(82, 62, 4.5, 'accent'))),
  ],
  motion: {
    tassel: swing({ angles: [14, -10, 5], pivot: [82, 40], duration: 800 }),
  },
});
