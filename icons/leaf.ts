import { circle, icon, inset, part, path, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'leaf',
  category: 'places',
  keywords: ['leaf', 'nature', 'eco', 'plant', 'green', 'organic', 'feuille', 'écologie'],
  gesture: 'The leaf sways on its stem.',
  draw: [
    part(
      'leaf',
      raised(path('M22 74C20 38 42 16 80 16C80 54 58 76 22 74Z', 'base', { outline: 3 })),
      inset(stroke('M18 80L62 34M40 57V40M40 57H57', 'main', 5.5)),
      // A drop of dew: the accent.
      inset(circle(62, 54, 7, 'accent')),
    ),
  ],
  motion: {
    leaf: swing({ angles: [6, -5, 3, -1], duration: 900, pivot: [18, 80] }),
  },
});
