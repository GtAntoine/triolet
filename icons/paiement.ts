import { circle, icon, inset, part, pill, pop, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'paiement',
  category: 'finance',
  keywords: ['payment', 'card', 'credit card', 'pay', 'bank', 'checkout', 'paiement', 'carte'],
  gesture: 'The card tilts and its chip answers.',
  draw: [
    part(
      'card',
      raised(rect(12, 22, 72, 52, 11, 'main'), rect(12, 35, 72, 9, 0, 'base')),
      inset(pill(22, 56, 22, 7, 'base')),
      part('chip', inset(circle(70, 59.5, 6, 'accent'))),
    ),
  ],
  motion: {
    card: swing({ angles: [-7, 3], at: [0.35, 0.7], duration: 600, ease: 'out' }),
    chip: pop({ duration: 450, delay: 150 }),
  },
});
