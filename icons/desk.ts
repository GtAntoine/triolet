import { icon, inset, part, pill, pop, raised, rect, resize } from '@triolet/core';

export default icon({
  name: 'desk',
  category: 'work',
  keywords: ['desk', 'office', 'table', 'workspace', 'furniture', 'drawer', 'bureau', 'meuble'],
  gesture: 'The handle of the top drawer pops.',
  draw: resize(
    [
    raised.small(rect(16, 40, 9, 40, 3, 'main')),
    // The drawers, then the top.
    raised(rect(48, 38, 34, 42, 6, 'base')),
    part('handle', inset(pill(58, 46, 14, 6, 'accent'))),
    inset(pill(58, 63, 14, 6, 'mid')),
    raised(pill(10, 28, 76, 12, 'main')),
    ],
    1,
    { move: [0, -6] },
  ),
  motion: {
    handle: pop({ scale: 1.3 }),
  },
});
