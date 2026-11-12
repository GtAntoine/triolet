import { circle, icon, inset, part, path, pill, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'cake',
  category: 'social',
  keywords: ['cake', 'birthday', 'party', 'celebrate', 'anniversary', 'dessert', 'gâteau', 'anniversaire'],
  gesture: 'The flame of the candle flickers.',
  draw: [
    raised.small(rect(45, 24, 6, 22, 3, 'main')),
    raised(rect(18, 42, 60, 38, 9, 'base')),
    inset(pill(26, 58, 44, 7, 'main')),
    inset(circle(31, 49, 3, 'accent'), circle(48, 49, 3, 'accent'), circle(65, 49, 3, 'accent')),
    raised(pill(12, 77, 72, 8, 'main')),
    part('flame', raised.small(path('M48 10C52 15 53 18 53 21A5 5 0 0 1 43 21C43 18 44 15 48 10Z', 'accent'))),
  ],
  motion: {
    flame: tracks({ duration: 800, pivot: 'bottom' }, { scaleY: [[0.25, 1.3], [0.5, 0.8], [0.75, 1.2]], skewY: [[0.25, -6], [0.6, 6]] }),
  },
});
