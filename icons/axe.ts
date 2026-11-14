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
      raised(path('M48.9 31.6L56.9 20L65.9 26.3L84.2 28Q89 46 66.6 53.5L58 37.8Z', 'base', { outline: 2.5 })),
      raised.small(stroke('M82.6 30.2Q85.8 43.4 67.9 51.3', 'accent', 4.5)),
    ),
    ],
    1,
    { move: [-5, 0] },
  ),
  motion: {
    axe: swing({ angles: [-16, 8, 0], at: [0.35, 0.65, 0.85], duration: 700, pivot: [19, 80] }),
  },
});
