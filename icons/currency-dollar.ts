import { circle, icon, inset, part, plain, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'currency-dollar',
  category: 'finance',
  keywords: ['dollar', 'money', 'price', 'usd', 'cost', 'payment', 'argent', 'prix'],
  gesture: 'The dollar sign pops on its coin.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    inset(ring(48, 48, 28, 'mid', 3.5)),
    part(
      'sign',
      plain(stroke('M48 24V72', 'accent', 7)),
      plain(stroke('M58 39C56 35 52 33 48 33C42 33 38 36 38 40.5C38 51 58 45 58 55.5C58 60 54 63 48 63C43 63 39 61 37 57', 'main', 7.5)),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.15, duration: 480 }),
  },
});
