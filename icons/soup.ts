import { icon, part, path, pill, raised, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'soup',
  category: 'social',
  keywords: ['soup', 'bowl', 'food', 'hot', 'meal', 'ramen', 'soupe', 'bol'],
  gesture: 'The steam rises from the bowl.',
  draw: [
    part('steam-1', raised.small(stroke('M36 36C32 30 40 26 36 18', 'accent', 5.5))),
    part('steam-2', raised.small(stroke('M52 36C48 30 56 26 52 18', 'accent', 5.5))),
    raised.small(pill(34, 78, 28, 7, 'main')),
    raised(path('M12 48H84C84 68 68 80 48 80C28 80 12 68 12 48Z', 'base')),
    raised.small(pill(8, 44, 80, 9, 'main')),
  ],
  motion: {
    ...stagger(['steam-1', 'steam-2'], travel({ from: [0, 8], fade: true, duration: 600 }), 180),
  },
});
