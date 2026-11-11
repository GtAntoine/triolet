import { circle, icon, inset, nudge, part, path, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'shopping-cart',
  category: 'commerce',
  keywords: ['cart', 'shopping', 'buy', 'basket', 'checkout', 'store', 'panier', 'caddie'],
  gesture: 'The cart rolls forward and comes back.',
  draw: [
    part(
      'cart',
      // The handle, with its accent grip.
      raised.small(stroke('M16 22H25L31 40', 'main', 5)),
      raised.small(pill(10, 18, 16, 8, 'accent')),
      raised(path('M26 36H78A5 5 0 0 1 83 42L78 64A7 7 0 0 1 71 70H40A7 7 0 0 1 33 64L27 42Z', 'base')),
      [43, 53, 63].map((x) => inset(rect(x, 44, 6, 18, 3, 'main'))),
      raised.small(circle(41, 80, 6, 'main'), circle(69, 80, 6, 'main')),
    ),
  ],
  motion: {
    cart: nudge({ x: 6, settle: true, duration: 600 }),
  },
});
