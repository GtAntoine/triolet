import { circle, ellipse, icon, inset, part, pill, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'bug',
  category: 'development',
  keywords: ['bug', 'insect', 'error', 'debug', 'issue', 'defect', 'bogue', 'insecte'],
  gesture: 'The bug wriggles.',
  draw: [
    part(
      'bug',
      // Six legs and two antennae, behind.
      raised.small(
        stroke('M32 46L16 38', 'main', 7),
        stroke('M29 58H13', 'main', 7),
        stroke('M32 70L17 79', 'main', 7),
        stroke('M64 46L80 38', 'main', 7),
        stroke('M67 58H83', 'main', 7),
        stroke('M64 70L79 79', 'main', 7),
        stroke('M42 22L36 12', 'main', 5),
        stroke('M54 22L60 12', 'main', 5),
      ),
      raised.small(circle(48, 29, 12, 'main')),
      // The shell, split in two, with its spots.
      raised(ellipse(48, 58, 21, 26, 'base')),
      inset(pill(46, 36, 4, 46, 'mid')),
      inset(circle(37, 52, 5, 'accent'), circle(59, 52, 5, 'accent'), circle(38, 68, 4, 'accent'), circle(58, 68, 4, 'accent')),
    ),
  ],
  motion: {
    bug: swing({ angles: [7, -6, 4, -2], duration: 700 }),
  },
});
