import { bounce, icon, inset, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'box',
  category: 'commerce',
  keywords: ['box', 'package', 'parcel', 'delivery', 'product', 'shipping', 'colis', 'paquet'],
  gesture: 'The parcel lands.',
  draw: [
    part(
      'parcel',
      raised(path('M26 18H70L82 36H14Z', 'main', { outline: 3 })),
      raised(rect(14, 34, 68, 48, 8, 'base')),
      raised.small(rect(43, 18, 10, 32, 2, 'accent')),
      inset(pill(22, 66, 24, 7, 'mid')),
    ),
  ],
  motion: {
    parcel: bounce({ height: 6, duration: 650 }),
  },
});
