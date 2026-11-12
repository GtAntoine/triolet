import { icon, inset, part, path, raised, rect, stroke, swing } from '@triolet/core';

export default icon({
  name: 'pin',
  category: 'interface',
  keywords: ['pin', 'thumbtack', 'pinned', 'attach', 'fix', 'sticky', 'épingle', 'épingler'],
  gesture: 'The pin tilts and comes back.',
  draw: [
    part(
      'pin',
      raised.small(stroke('M48 58V84', 'accent', 6)),
      raised(path('M36 24H60L64 46C75 51 78 56 78 60H18C18 56 21 51 32 46Z', 'base', { outline: 2 })),
      raised(rect(32, 10, 32, 14, 6, 'main')),
      inset(rect(38, 28, 6, 18, 3, 'soft')),
    ),
  ],
  motion: {
    pin: swing({ angles: [-12, 8, -4, 0], duration: 700, pivot: [48, 84] }),
  },
});
