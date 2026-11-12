import { circle, icon, inset, part, plain, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'currency-euro',
  category: 'finance',
  keywords: ['euro', 'money', 'price', 'eur', 'cost', 'payment', 'argent', 'prix'],
  gesture: 'The euro sign pops on its coin.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    inset(ring(48, 48, 28, 'mid', 3.5)),
    part(
      'sign',
      plain(stroke('M60 37A15 16 0 1 0 60 59', 'main', 8)),
      plain(stroke('M30 44H50M30 53H48', 'accent', 5.5)),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.15, duration: 480 }),
  },
});
