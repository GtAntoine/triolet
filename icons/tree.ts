import { circle, icon, inset, part, pill, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'tree',
  category: 'places',
  keywords: ['tree', 'nature', 'forest', 'park', 'plant', 'garden', 'arbre', 'forêt'],
  gesture: 'The crown of the tree sways.',
  draw: [
    raised.small(rect(42.5, 54, 11, 28, 3, 'main'), pill(28, 78, 40, 8, 'main')),
    part(
      'crown',
      raised(circle(48, 32, 22, 'base'), circle(31, 44, 15, 'base'), circle(65, 44, 15, 'base'), circle(48, 48, 14, 'base')),
      // Three fruits: the accent.
      inset(circle(38, 30, 5, 'accent'), circle(58, 36, 5, 'accent'), circle(42, 48, 5, 'accent')),
    ),
  ],
  motion: {
    crown: swing({ angles: [5, -4, 3, -1], duration: 900, pivot: [48, 62] }),
  },
});
