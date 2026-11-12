import { ellipse, icon, inset, nudge, part, path, raised } from '@triolet/core';

export default icon({
  name: 'ghost',
  category: 'social',
  keywords: ['ghost', 'spooky', 'halloween', 'boo', 'spirit', 'empty', 'fantôme', 'esprit'],
  gesture: 'The ghost floats up and down.',
  draw: [
    part(
      'ghost',
      raised(path('M20 46A28 30 0 0 1 76 46V82L66.5 74L57.5 82L48 74L38.5 82L29.5 74L20 82Z', 'base', { outline: 3 })),
      inset(ellipse(37, 44, 7.5, 10.5, 'main'), ellipse(59, 44, 7.5, 10.5, 'main')),
      // The mouth: the accent.
      inset(ellipse(48, 62, 8, 8.5, 'accent')),
    ),
  ],
  motion: {
    ghost: nudge({ y: -6, duration: 1000, ease: 'inOut' }),
  },
});
