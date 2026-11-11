import { circle, icon, inset, part, path, pill, raised, travel } from '@triolet/core';

export default icon({
  name: 'filter',
  category: 'interface',
  keywords: ['filter', 'funnel', 'sort', 'refine', 'narrow', 'search', 'filtrer', 'entonnoir'],
  gesture: 'A drop falls from the funnel, twice.',
  draw: [
    raised(path('M16 18H80L57 46V66L39 72V46Z', 'base', { outline: 6 })),
    inset(pill(25, 20, 46, 7, 'main')),
    part('drop', raised.small(circle(48, 82, 5, 'accent'))),
  ],
  motion: {
    drop: travel({ from: [0, -9], fade: true, duration: 450, ease: 'outSoft', iterations: 2 }),
  },
});
