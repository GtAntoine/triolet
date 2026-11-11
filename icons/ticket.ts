import { circle, icon, inset, part, path, pill, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'ticket',
  category: 'commerce',
  keywords: ['ticket', 'pass', 'event', 'entry', 'coupon', 'admission', 'billet', 'entrée'],
  gesture: 'The stamp of the ticket pops.',
  draw: [
    // Two notches where the stub tears off.
    raised(path('M18 28H78A6 6 0 0 1 84 34V42A6 6 0 0 0 84 54V62A6 6 0 0 1 78 68H18A6 6 0 0 1 12 62V54A6 6 0 0 0 12 42V34A6 6 0 0 1 18 28Z', 'base')),
    inset(pill(24, 37, 26, 7, 'main')),
    inset(pill(24, 51, 18, 7, 'main')),
    inset(rect(57, 34, 4, 28, 2, 'mid')),
    part('stamp', inset(circle(71, 48, 6, 'accent'))),
  ],
  motion: {
    stamp: pop({ scale: 1.3, duration: 450 }),
  },
});
