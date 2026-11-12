import { icon, nudge, part, path, pill, raised, resize } from '@triolet/core';

const TILT = { rotate: [45, 48, 48] as [number, number, number] };

export default icon({
  name: 'plane',
  aliases: ['airplane'],
  category: 'places',
  keywords: ['plane', 'airplane', 'flight', 'travel', 'airport', 'trip', 'avion', 'vol'],
  gesture: 'The plane flies off and comes back.',
  draw: resize(
    [
    part(
      'plane',
      // The wings, the tail (the accent), then the fuselage on top.
      raised(path('M48 34L86 58V66L48 55L10 66V58Z', 'base', { outline: 3, ...TILT })),
      raised.small(path('M48 68L64 80V85L48 80L32 85V80Z', 'accent', { outline: 2, ...TILT })),
      raised(pill(41, 8, 14, 78, 'main', TILT)),
    ),
    ],
    1,
    { move: [6, -6] },
  ),
  motion: {
    plane: nudge({ x: 6, y: -6, settle: true, duration: 650 }),
  },
});
