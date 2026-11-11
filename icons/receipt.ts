import { icon, inset, part, path, pill, raised, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'receipt',
  category: 'finance',
  keywords: ['receipt', 'invoice', 'bill', 'ticket', 'purchase', 'total', 'reçu', 'facture'],
  gesture: 'The lines print one after the other, the total last.',
  draw: [
    raised(path('M24 14H72V80L64 75L56 80L48 75L40 80L32 75L24 80Z', 'base', { outline: 5 })),
    part('line-1', inset(pill(31, 22, 34, 7, 'main'))),
    part('line-2', inset(pill(31, 35, 24, 6, 'main'))),
    part('line-3', inset(pill(31, 46, 30, 6, 'mid'))),
    part('line-4', inset(pill(45, 59, 20, 8, 'accent'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2', 'line-3', 'line-4'], reveal({ duration: 350 }), 90),
  },
});
