import { icon, inset, part, pill, raised, rect, stroke, travel } from '@triolet/core';

export default icon({
  name: 'scan',
  category: 'devices',
  keywords: ['scan', 'scanner', 'frame', 'capture', 'read', 'detect', 'viseur', 'numériser'],
  gesture: 'The line sweeps the frame up and down.',
  draw: [
    // The four corners of the viewfinder.
    raised.small(
      stroke('M14 32V24A10 10 0 0 1 24 14H32', 'main', 7),
      stroke('M64 14H72A10 10 0 0 1 82 24V32', 'main', 7),
      stroke('M82 64V72A10 10 0 0 1 72 82H64', 'main', 7),
      stroke('M32 82H24A10 10 0 0 1 14 72V64', 'main', 7),
    ),
    raised(rect(25, 25, 46, 46, 9, 'base')),
    part('line', inset(pill(31, 44, 34, 8, 'accent'))),
  ],
  motion: {
    line: travel({ via: [[0, -11, 0.3], [0, 11, 0.7]], duration: 900, ease: 'inOut' }),
  },
});
