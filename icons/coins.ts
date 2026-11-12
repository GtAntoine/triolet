import { bounce, circle, icon, inset, part, plain, raised, ring } from '@triolet/core';

export default icon({
  name: 'coins',
  category: 'finance',
  keywords: ['coins', 'money', 'cash', 'change', 'payment', 'savings', 'pièces', 'monnaie'],
  gesture: 'The coin in front bounces.',
  draw: [
    // The coin behind, dark.
    raised(circle(60, 38, 24, 'main')),
    inset(ring(60, 38, 16, 'mainLight', 4)),
    // The coin in front.
    part('coin', plain(circle(38, 58, 29, 'gap')), raised(circle(38, 58, 26, 'base')), inset(ring(38, 58, 18, 'mid', 4)), inset(circle(38, 58, 8, 'accent'))),
  ],
  motion: {
    coin: bounce({ height: 7 }),
  },
});
