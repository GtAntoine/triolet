import { bounce, circle, icon, inset, part, path, pill, raised } from '@triolet/core';

const TILT = { rotate: [-18, 48, 34] as [number, number, number] };

export default icon({
  name: 'bone',
  category: 'social',
  keywords: ['bone', 'dog', 'pet', 'treat', 'food', 'bowl', 'os', 'gamelle'],
  gesture: 'The bone bounces above the bowl.',
  draw: [
    // The bone: a shaft and four knobs, as one shape.
    part(
      'bone',
      raised(
        pill(28, 28, 40, 12, 'base', TILT),
        circle(28, 28, 8, 'base', TILT),
        circle(28, 40, 8, 'base', TILT),
        circle(68, 28, 8, 'base', TILT),
        circle(68, 40, 8, 'base', TILT),
      ),
    ),
    // The bowl and its band: the accent.
    raised(path('M16 56H80L74 78A6 6 0 0 1 68 82H28A6 6 0 0 1 22 78Z', 'main', { outline: 2 })),
    inset(pill(33, 65, 30, 7, 'accent')),
  ],
  motion: {
    bone: bounce({ height: 7 }),
  },
});
