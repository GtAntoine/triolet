import { circle, icon, inset, nudge, part, path, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'messagerie',
  category: 'communication',
  keywords: ['messages', 'chat', 'conversation', 'reply', 'typing', 'inbox', 'messagerie', 'discussion'],
  gesture: 'The three dots type, then the unread mark of the answer pops.',
  draw: [
    part(
      'reply',
      raised(path('M60 32H66A18 18 0 0 1 84 50V54A18 18 0 0 1 81 64L83 77L72 71A18 18 0 0 1 66 72H60A18 18 0 0 1 42 54V50A18 18 0 0 1 60 32Z', 'base')),
    ),
    part('unread', inset(circle(70, 58, 4, 'accent'))),
    raised(path('M32 16H44A20 20 0 0 1 64 36V38A20 20 0 0 1 44 58H32A20 20 0 0 1 25 56.7L14 64L17 52A20 20 0 0 1 12 38V36A20 20 0 0 1 32 16Z', 'main')),
    [28, 38, 48].map((cx, k) => part(`dot-${k + 1}`, inset(circle(cx, 37, 3.8, 'base')))),
  ],
  motion: {
    unread: pop({ duration: 450, delay: 350 }),
    ...stagger(['dot-1', 'dot-2', 'dot-3'], nudge({ y: -6, settle: true, duration: 450, ease: 'inOut' }), 100),
  },
});
