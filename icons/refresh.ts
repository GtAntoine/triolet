import { circle, icon, part, path, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'refresh',
  category: 'arrows',
  keywords: ['refresh', 'reload', 'sync', 'update', 'retry', 'rotate', 'actualiser', 'recharger'],
  gesture: 'The arrow goes once around.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'arrow',
      raised.small(stroke('M63 37A18.5 18.5 0 1 0 66 52', 'main', 8), path('M56 27L68 28L67 40Z', 'main', { outline: 4 })),
      raised.small(circle(66, 53, 8, 'accent')),
    ),
  ],
  motion: {
    arrow: spin({ turns: 1, duration: 800, pivot: [48, 48] }),
  },
});
