import { circle, icon, inset, part, path, pill, raised, swing } from '@triolet/core';

export default icon({
  name: 'tag',
  category: 'commerce',
  keywords: ['tag', 'price', 'label', 'sale', 'discount', 'category', 'étiquette', 'prix'],
  gesture: 'The tag swings from its hole.',
  draw: [
    part(
      'tag',
      raised(path('M14 44L42 16H70A8 8 0 0 1 78 24V52L50 80A8 8 0 0 1 38.7 80L14 55.3A8 8 0 0 1 14 44Z', 'base')),
      inset(circle(62, 32, 6.5, 'accent')),
      inset(pill(29, 49.5, 26, 7, 'main', { rotate: [-45, 42, 53] })),
      inset(pill(25, 40.5, 18, 7, 'main', { rotate: [-45, 34, 44] })),
    ),
  ],
  motion: {
    tag: swing({ angles: [9, -6, 3], pivot: [62, 32], duration: 800 }),
  },
});
