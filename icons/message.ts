import { circle, icon, inset, part, path, pill, plain, pop, raised, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'message',
  category: 'communication',
  keywords: ['message', 'chat', 'comment', 'bubble', 'talk', 'conversation', 'discussion', 'commentaire'],
  gesture: 'The message writes itself and the unread badge pops.',
  draw: [
    raised(path('M24 20H70A12 12 0 0 1 82 32V54A12 12 0 0 1 70 66H42L26 80V66H24A12 12 0 0 1 12 54V32A12 12 0 0 1 24 20Z', 'base')),
    part('line-1', inset(pill(24, 33, 38, 7, 'main'))),
    part('line-2', inset(pill(24, 46, 26, 7, 'main'))),
    part('badge', plain(circle(76, 24, 12, 'gap')), raised.small(circle(76, 24, 9, 'accent'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2'], reveal({ duration: 400 }), 120),
    badge: pop({ duration: 450, delay: 300 }),
  },
});
