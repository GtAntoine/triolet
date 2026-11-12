import { icon, part, pill, raised, rect, stroke, swing } from '@triolet/core';

export default icon({
  name: 'gavel',
  category: 'civic',
  keywords: ['gavel', 'judge', 'law', 'court', 'auction', 'justice', 'marteau', 'tribunal'],
  gesture: 'The gavel strikes its block.',
  draw: [
    // The block.
    raised(pill(12, 72, 46, 12, 'main')),
    part(
      'gavel',
      raised.small(stroke('M46 40L77 71', 'main', 8)),
      // The head, with its band: the accent.
      raised(rect(19, 17, 46, 24, 7, 'base', { rotate: [-45, 42, 29] }), rect(36, 17, 12, 24, 0, 'accent', { rotate: [-45, 42, 29] })),
    ),
  ],
  motion: {
    gavel: swing({ angles: [16, -10, 0], at: [0.35, 0.6, 0.8], duration: 700, pivot: [77, 71] }),
  },
});
