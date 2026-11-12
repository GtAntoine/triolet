import { icon, part, path, raised, rect, resize, stroke, tracks } from '@triolet/core';
import { HEART } from './_shared.ts';

export default icon({
  name: 'scan-heart',
  category: 'health',
  keywords: ['scan', 'heart', 'health', 'pulse', 'monitor', 'check-up', 'santé', 'cœur'],
  gesture: 'The heart beats twice in the frame.',
  draw: resize(
    [
    raised.small(
      stroke('M14 32V24A10 10 0 0 1 24 14H32', 'main', 7),
      stroke('M64 14H72A10 10 0 0 1 82 24V32', 'main', 7),
      stroke('M82 64V72A10 10 0 0 1 72 82H64', 'main', 7),
      stroke('M32 82H24A10 10 0 0 1 14 72V64', 'main', 7),
    ),
    raised(rect(25, 25, 46, 46, 9, 'base')),
    part('heart', ...resize([raised.small(path(HEART, 'accent'))], 0.72, { about: [48, 23], move: [0, 24] })),
    ],
    0.92,
  ),
  motion: {
    heart: tracks({ duration: 800, ease: 'inOut', pivot: [48, 48] }, { scale: [[0.2, 1.2], [0.4, 1], [0.6, 1.12]] }),
  },
});
