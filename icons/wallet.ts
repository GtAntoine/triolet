import { circle, icon, inset, nudge, part, path, raised, rect } from '@triolet/core';

export default icon({
  name: 'wallet',
  category: 'finance',
  keywords: ['wallet', 'money', 'payment', 'purse', 'cash', 'balance', 'portefeuille', 'argent'],
  gesture: 'The clasp of the wallet opens and snaps back.',
  draw: [
    raised(rect(12, 24, 72, 54, 12, 'base'), path('M24 24H72A12 12 0 0 1 84 36V40H12V36A12 12 0 0 1 24 24Z', 'main')),
    part('clasp', raised.small(rect(56, 47, 30, 20, 10, 'main')), inset(circle(68, 57, 4.5, 'accent'))),
  ],
  motion: {
    clasp: nudge({ x: 5, settle: true, duration: 500 }),
  },
});
