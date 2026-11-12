import { icon, inset, part, path, pill, raised, resize, swing } from '@triolet/core';

const TILT = { rotate: [40, 48, 48] as [number, number, number] };

export default icon({
  name: 'carrot',
  category: 'social',
  keywords: ['carrot', 'vegetable', 'food', 'healthy', 'vegan', 'garden', 'carotte', 'légume'],
  gesture: 'The leaves of the carrot wave.',
  draw: resize(
    [
      // Three leaves, fanned from the top of the root.
      part(
        'leaves',
        raised.small(
          pill(57, 5, 10, 28, 'main', { rotate: [8, 62, 31] }),
          pill(57, 5, 10, 28, 'main', { rotate: [40, 62, 31] }),
          pill(57, 5, 10, 28, 'main', { rotate: [72, 62, 31] }),
        ),
      ),
      // The root, light, with three grooves: the accent.
      raised(path('M33 34C33 22 63 22 63 34L52 80A4 4 0 0 1 44 80Z', 'base', { outline: 4, ...TILT })),
      inset(pill(38, 38, 14, 5, 'accent', TILT), pill(47, 50, 10, 5, 'accent', TILT), pill(42, 62, 8, 5, 'accent', TILT)),
    ],
    1,
    { move: [-6, 5] },
  ),
  motion: {
    leaves: swing({ angles: [8, -6, 4, -2], duration: 800, pivot: [56, 36] }),
  },
});
