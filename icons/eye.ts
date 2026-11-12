import { circle, clip, icon, inset, part, path, raised, travel } from '@triolet/core';

const outline = 'M10 48C22 30 36 22 48 22C60 22 74 30 86 48C74 66 60 74 48 74C36 74 22 66 10 48Z';

export default icon({
  name: 'eye',
  category: 'interface',
  keywords: ['eye', 'view', 'show', 'visible', 'watch', 'preview', 'oeil', 'voir'],
  gesture: 'The eye looks left, then right.',
  draw: [
    raised(path(outline, 'base')),
    clip(path(outline, 'base'), part('iris', inset(circle(48, 48, 16, 'main')), inset(circle(48, 48, 7, 'accent')))),
  ],
  motion: {
    iris: travel({
      via: [
        [-10, 0, 0.3],
        [10, 0, 0.7],
      ],
      duration: 1000,
    }),
  },
});
