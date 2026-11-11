import { circle, icon, inset, part, path, pop, raised, swing } from '@triolet/core';

export default icon({
  name: 'user',
  category: 'people',
  keywords: ['user', 'person', 'account', 'profile', 'member', 'avatar', 'utilisateur', 'compte'],
  gesture: 'The head nods and the badge pops.',
  draw: [
    raised(path('M16 80V76A32 28 0 0 1 80 76V80A5 5 0 0 1 75 85H21A5 5 0 0 1 16 80Z', 'main')),
    part('badge', inset(circle(63, 70, 5, 'accent'))),
    part('head', raised(circle(48, 31, 17, 'base'))),
  ],
  motion: {
    head: swing({ angles: [-8, 6], pivot: 'bottom', duration: 600 }),
    badge: pop({ duration: 400, delay: 250 }),
  },
});
