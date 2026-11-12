import { icon, part, path, raised, resize, stroke, swing } from '@triolet/core';

export default icon({
  name: 'axe',
  category: 'work',
  keywords: ['axe', 'chop', 'wood', 'tool', 'lumber', 'cut', 'hache', 'bûcheron'],
  gesture: 'The axe is raised, then strikes.',
  draw: resize(
    [
    part(
      'axe',
      raised.small(stroke('M24 80L60 28', 'main', 8)),
      // The head, and its edge: the accent.
      raised(path('M48 24L66 12C80 18 87 32 83 48L62 44Z', 'base', { outline: 3 })),
      raised.small(stroke('M69 13C81 20 86 33 83 46', 'accent', 5.5)),
    ),
    ],
    1,
    { move: [-5, 0] },
  ),
  motion: {
    axe: swing({ angles: [-16, 8, 0], at: [0.35, 0.65, 0.85], duration: 700, pivot: [19, 80] }),
  },
});
