import { circle, icon, inset, nudge, part, path, plain, raised, stroke } from '@triolet/core';

export default icon({
  name: 'sticker',
  category: 'social',
  keywords: ['sticker', 'label', 'emoji', 'peel', 'decal', 'smile', 'autocollant', 'étiquette'],
  gesture: 'The corner of the sticker peels a little.',
  draw: [
    raised(path('M27 16H69A11 11 0 0 1 80 27V56L56 80H27A11 11 0 0 1 16 69V27A11 11 0 0 1 27 16Z', 'base')),
    inset(circle(36, 40, 4.5, 'main'), circle(58, 40, 4.5, 'main')),
    plain(stroke('M36 53C42 60 52 60 58 53', 'accent', 5.5)),
    // The peeled corner.
    part('corner', raised.small(path('M80 56L56 80V67A11 11 0 0 1 67 56Z', 'main'))),
  ],
  motion: {
    corner: nudge({ x: -4, y: -4, duration: 600 }),
  },
});
