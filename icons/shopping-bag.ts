import { circle, icon, inset, part, path, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'shopping-bag',
  category: 'commerce',
  keywords: ['bag', 'shopping', 'purchase', 'store', 'buy', 'order', 'sac', 'achats'],
  gesture: 'The bag swings from its handles.',
  draw: [
    part(
      'bag',
      raised(path('M21 34H75L80 77A7 7 0 0 1 73 85H23A7 7 0 0 1 16 77Z', 'base')),
      raised.small(stroke('M36 44V30A12 12 0 0 1 60 30V44', 'main', 6)),
      inset(circle(48, 64, 6.5, 'accent')),
    ),
  ],
  motion: {
    bag: swing({ angles: [7, -5, 3], pivot: [48, 18], duration: 800 }),
  },
});
