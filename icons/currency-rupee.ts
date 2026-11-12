import { circle, icon, inset, part, plain, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'currency-rupee',
  category: 'finance',
  keywords: ['rupee', 'money', 'price', 'inr', 'india', 'payment', 'roupie', 'argent'],
  gesture: 'The rupee sign pops on its coin.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    inset(ring(48, 48, 28, 'mid', 3.5)),
    part(
      'sign',
      plain(stroke('M37 31H60M38 31H46A8.5 8.5 0 0 1 46 48H38L54 66', 'main', 7.5)),
      plain(stroke('M37 40H60', 'accent', 6.5)),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.15, duration: 480 }),
  },
});
