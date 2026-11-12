import { blink, circle, icon, part, path, pill, raised, stagger, stroke, resize } from '@triolet/core';

export default icon({
  name: 'satellite-dish',
  category: 'devices',
  keywords: ['satellite', 'dish', 'antenna', 'signal', 'broadcast', 'reception', 'parabole', 'antenne'],
  gesture: 'The dish receives its signal, wave after wave.',
  draw: resize(
    [
    raised.small(stroke('M38 62V80', 'main', 7), pill(22, 78, 34, 8, 'main')),
    // The bowl opens towards the top right.
    raised(path('M14 46A32 32 0 0 0 78 46Z', 'base', { rotate: [45, 46, 46] })),
    raised.small(stroke('M40 52L54 38', 'main', 5)),
    raised.small(circle(56, 36, 6, 'accent')),
    part('wave-1', raised.small(stroke('M64 20A14 14 0 0 1 76 32', 'accent', 5.5))),
    part('wave-2', raised.small(stroke('M68 9A25 25 0 0 1 87 28', 'main', 5.5))),
    ],
    0.94,
    { move: [-2, 2] },
  ),
  motion: {
    ...stagger(['wave-2', 'wave-1'], blink({ to: 0.1, duration: 500 }), 160),
  },
});
