import { blink, circle, icon, inset, part, path, pill, raised, rect, resize } from '@triolet/core';

export default icon({
  name: 'ambulance',
  category: 'health',
  keywords: ['ambulance', 'emergency', 'hospital', 'rescue', 'medical', 'urgent', 'urgence', 'secours'],
  gesture: 'The cross flashes twice.',
  draw: resize(
    [
      raised(path('M56 38H69L84 52V64A3 3 0 0 1 81 67H56Z', 'main', { outline: 2 })),
      inset(path('M62 44H68L75 52H62Z', 'soft')),
      raised.small(pill(26, 18, 14, 10, 'main')),
      raised(rect(10, 24, 48, 43, 7, 'base')),
      // The cross is the accent.
      part('cross', inset(pill(30, 33, 8, 24, 'accent'), pill(22, 41, 24, 8, 'accent'))),
      raised.small(circle(28, 70, 8.5, 'main'), circle(68, 70, 8.5, 'main')),
      inset(circle(28, 70, 3, 'base'), circle(68, 70, 3, 'base')),
    ],
    1,
    { move: [0, -2] },
  ),
  motion: {
    cross: blink({ to: 0.15, duration: 400, iterations: 2 }),
  },
});
