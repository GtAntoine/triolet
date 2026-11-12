import { circle, icon, inset, part, path, pop, raised, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'pizza',
  category: 'social',
  keywords: ['pizza', 'food', 'slice', 'restaurant', 'meal', 'delivery', 'part', 'repas'],
  gesture: 'The three toppings pop, one after the other.',
  draw: [
    raised(path('M14 30C36 16 60 16 82 30L48 86Z', 'base', { outline: 4 })),
    raised.small(stroke('M14 28C36 14 60 14 82 28', 'main', 9)),
    part('topping-1', inset(circle(37, 39, 6.5, 'accent'))),
    part('topping-2', inset(circle(58, 43, 6, 'accent'))),
    part('topping-3', inset(circle(47, 60, 5.5, 'accent'))),
  ],
  motion: {
    ...stagger(['topping-1', 'topping-2', 'topping-3'], pop({ scale: 1.4, duration: 380 }), 110),
  },
});
