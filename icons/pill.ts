import { icon, inset, part, path, pill, raised, swing } from '@triolet/core';

export default icon({
  name: 'pill',
  category: 'health',
  keywords: ['pill', 'medicine', 'capsule', 'drug', 'pharmacy', 'treatment', 'médicament', 'gélule'],
  gesture: 'The capsule rocks on itself.',
  draw: [
    // One capsule in two colours, tilted, with a mark on its light half: the accent.
    part(
      'capsule',
      raised(
        pill(8, 31, 80, 34, 'base', { rotate: [-40, 48, 48] }),
        path('M8 48A17 17 0 0 1 25 31H48V65H25A17 17 0 0 1 8 48Z', 'main', { rotate: [-40, 48, 48] }),
      ),
      inset(pill(57, 43, 20, 10, 'accent', { rotate: [-40, 48, 48] })),
    ),
  ],
  motion: {
    capsule: swing({ angles: [-14, 10, -6, 3], duration: 800 }),
  },
});
