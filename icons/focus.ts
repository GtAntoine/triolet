import { circle, icon, inset, part, pop, raised, stroke, resize } from '@triolet/core';

export default icon({
  name: 'focus',
  category: 'interface',
  keywords: ['focus', 'center', 'target', 'frame', 'autofocus', 'attention', 'mise au point', 'cadrer'],
  gesture: 'The frame closes on its point.',
  draw: resize(
    [
    part(
      'frame',
      raised.small(
        stroke('M14 32V24A10 10 0 0 1 24 14H32', 'main', 7),
        stroke('M64 14H72A10 10 0 0 1 82 24V32', 'main', 7),
        stroke('M82 64V72A10 10 0 0 1 72 82H64', 'main', 7),
        stroke('M32 82H24A10 10 0 0 1 14 72V64', 'main', 7),
      ),
    ),
    raised(circle(48, 48, 23, 'base')),
    inset(circle(48, 48, 9, 'accent')),
    ],
    0.92,
  ),
  motion: {
    frame: pop({ scale: 0.9, duration: 500, pivot: [48, 48] }),
  },
});
