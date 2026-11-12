import { circle, icon, inset, part, path, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'candy-cane',
  category: 'social',
  keywords: ['candy cane', 'christmas', 'sweet', 'holiday', 'xmas', 'sugar', 'sucre d orge', 'noël'],
  gesture: 'The candy cane swings from its hook.',
  draw: [
    part(
      'cane',
      raised(stroke('M40 84V34A16 16 0 0 1 72 34V44', 'base', 14)),
      // The stripes: the accent.
      inset(
        stroke('M36 76L44 70', 'accent', 4.5),
        stroke('M36 62L44 56', 'accent', 4.5),
        stroke('M36 48L44 42', 'accent', 4.5),
        stroke('M42 27L49 21', 'accent', 4.5),
        stroke('M58 16L62 23', 'accent', 4.5),
        stroke('M68 36H76', 'accent', 4.5),
      ),
      // A bow, half way up.
      raised.small(path('M40 60L26 52V68Z', 'main', { outline: 3 }), path('M40 60L54 52V68Z', 'main', { outline: 3 }), circle(40, 60, 5, 'main')),
    ),
  ],
  motion: {
    cane: swing({ angles: [7, -6, 3, -1], duration: 850, pivot: [56, 18] }),
  },
});
