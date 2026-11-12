import { bounce, icon, part, raised, rect } from '@triolet/core';

export default icon({
  name: 'armchair',
  category: 'places',
  keywords: ['armchair', 'sofa', 'seat', 'furniture', 'living-room', 'relax', 'fauteuil', 'salon'],
  gesture: 'The cushion bounces on the seat.',
  draw: [
    // The feet and the back, behind.
    raised.small(rect(22, 74, 8, 10, 3, 'main'), rect(66, 74, 8, 10, 3, 'main')),
    raised(rect(22, 14, 52, 46, 14, 'main')),
    // The cushion is the accent.
    part('cushion', raised.small(rect(36, 36, 24, 18, 6, 'accent'))),
    // The seat and the two arms, in front.
    raised(rect(26, 52, 44, 26, 6, 'base'), rect(10, 40, 22, 38, 10, 'base'), rect(64, 40, 22, 38, 10, 'base')),
  ],
  motion: {
    cushion: bounce({ height: 6 }),
  },
});
