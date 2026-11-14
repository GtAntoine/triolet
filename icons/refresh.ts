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
      raised.small(stroke('M66.8 54.8A20 20 0 1 1 62.7 34.3', 'main', 8), path('M69.6 28.5L70.4 43.5L55.8 40.1Z', 'main', { outline: 3 })),
      raised.small(circle(66.8, 54.8, 8, 'accent')),
    ),
  ],
  motion: {
    arrow: spin({ turns: 1, duration: 800, pivot: [48, 48] }),
  },
});
