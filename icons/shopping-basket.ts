import { icon, inset, part, path, pill, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'shopping-basket',
  category: 'commerce',
  keywords: ['basket', 'shopping', 'cart', 'buy', 'groceries', 'store', 'panier', 'courses'],
  gesture: 'The basket swings on its handles.',
  draw: [
    part(
      'basket',
      // The two handles, behind.
      raised.small(stroke('M31 42L41 17', 'main', 6), stroke('M65 42L55 17', 'main', 6)),
      raised(path('M18 46H78L72 76A8 8 0 0 1 64 82H32A8 8 0 0 1 24 76Z', 'base')),
      inset(pill(33, 56, 6, 17, 'mid'), pill(57, 56, 6, 17, 'mid')),
      inset(pill(45, 56, 6, 17, 'accent')),
      raised.small(pill(10, 38, 76, 12, 'main')),
    ),
  ],
  motion: {
    basket: swing({ angles: [6, -5, 3, -1], duration: 800, pivot: 'top' }),
  },
});
