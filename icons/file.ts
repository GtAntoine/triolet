import { icon, inset, nudge, part, path, pill, raised } from '@triolet/core';

export default icon({
  name: 'file',
  category: 'documents',
  keywords: ['file', 'document', 'page', 'sheet', 'paper', 'blank', 'fichier', 'feuille'],
  gesture: 'The sheet lifts and settles.',
  draw: [
    part(
      'sheet',
      raised(path('M31 14H58L80 36V70A13 13 0 0 1 67 83H31A13 13 0 0 1 18 70V27A13 13 0 0 1 31 14Z', 'base')),
      // The folded corner is dark here: the accent is the title of the page.
      raised.small(path('M58 14L80 36H63A5 5 0 0 1 58 31Z', 'main')),
      inset(pill(30, 46, 20, 9, 'accent')),
      inset(pill(30, 62, 36, 9, 'main')),
    ),
  ],
  motion: {
    sheet: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
