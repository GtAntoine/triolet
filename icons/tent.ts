import { icon, inset, part, path, pill, raised, tracks } from '@triolet/core';

export default icon({
  name: 'tent',
  category: 'places',
  keywords: ['tent', 'camping', 'camp', 'outdoor', 'shelter', 'nature', 'tente', 'bivouac'],
  gesture: 'The flap of the tent opens, then closes.',
  draw: [
    raised(path('M48 16L84 76H12Z', 'base', { outline: 5 })),
    inset(path('M48 38L66 78H30Z', 'main')),
    part('flap', inset(path('M48 38V78H30Z', 'accent'))),
    raised.small(pill(8, 76, 80, 8, 'main')),
  ],
  motion: {
    flap: tracks({ duration: 900, ease: 'inOut', pivot: [30, 78] }, { scaleX: [[0.35, 0.3], [0.65, 0.3]] }),
  },
});
