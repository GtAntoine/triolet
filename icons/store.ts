import { icon, inset, part, path, pill, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'store',
  category: 'commerce',
  keywords: ['store', 'shop', 'storefront', 'market', 'retail', 'boutique', 'magasin', 'commerce'],
  gesture: 'The door pops open.',
  draw: [
    raised(rect(16, 38, 64, 44, 8, 'base')),
    inset(rect(22, 48, 20, 16, 4, 'soft')),
    part('door', inset(rect(50, 50, 20, 32, 5, 'accent'))),
    // The awning, with its three scallops.
    raised(path('M14 24A6 6 0 0 1 20 18H76A6 6 0 0 1 82 24L86 38H10Z', 'main')),
  ],
  motion: {
    door: pop({ scale: 1.15, duration: 480, pivot: 'bottom' }),
  },
});
