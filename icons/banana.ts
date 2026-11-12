import { ellipse, icon, inset, part, path, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'banana',
  category: 'social',
  keywords: ['banana', 'fruit', 'food', 'healthy', 'snack', 'yellow', 'banane', 'goûter'],
  gesture: 'The banana rocks.',
  draw: [
    part(
      'banana',
      // A dark rim, then the light flesh on top.
      raised(path('M20 26C20 60 44 80 76 74C82 73 82 65 76 64C56 62 40 48 36 26C35 20 20 20 20 26Z', 'main', { outline: 8 })),
      raised.small(path('M20 26C20 60 44 80 76 74C82 73 82 65 76 64C56 62 40 48 36 26C35 20 20 20 20 26Z', 'base', { outline: 2 })),
      raised.small(stroke('M24 20L32 18', 'main', 9), stroke('M79 69L83 68', 'main', 8)),
      // The sticker: the accent.
      inset(ellipse(45, 55, 8, 6, 'accent', { rotate: [42, 46, 55] })),
    ),
  ],
  motion: {
    banana: swing({ angles: [-8, 6, -3, 0], duration: 800, pivot: [48, 78] }),
  },
});
