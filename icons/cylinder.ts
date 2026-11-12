import { ellipse, icon, inset, nudge, part, path, raised, stroke } from '@triolet/core';

export default icon({
  name: 'cylinder',
  category: 'design',
  keywords: ['cylinder', 'shape', 'volume', 'tank', 'storage', 'geometry', 'cylindre', 'forme'],
  gesture: 'The top of the cylinder lifts and settles.',
  draw: [
    raised(path('M20 30V68A28 12 0 0 0 76 68V30Z', 'base')),
    inset(stroke('M24 54A24 9 0 0 0 72 54', 'accent', 5)),
    part('top', raised(ellipse(48, 28, 28, 12, 'main'))),
  ],
  motion: {
    top: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
