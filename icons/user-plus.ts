import { circle, icon, part, path, plain, pop, raised, stroke } from '@triolet/core';

export default icon({
  name: 'user-plus',
  category: 'people',
  keywords: ['user', 'add', 'invite', 'new', 'follow', 'member', 'utilisateur', 'inviter'],
  gesture: 'The plus badge pops on the user.',
  draw: [
    raised(path('M16 80V76A32 28 0 0 1 80 76V80A5 5 0 0 1 75 85H21A5 5 0 0 1 16 80Z', 'base')),
    raised(circle(48, 31, 17, 'main')),
    part('badge', plain(circle(70, 66, 17, 'gap')), raised.small(circle(70, 66, 14, 'accent')), plain(stroke('M63 66H77M70 59V73', 'on', 4.5))),
  ],
  motion: {
    badge: pop(),
  },
});
