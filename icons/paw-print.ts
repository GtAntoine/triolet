import { circle, ellipse, icon, inset, part, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'paw-print',
  aliases: ['paw'],
  category: 'social',
  keywords: ['paw', 'pet', 'animal', 'dog', 'cat', 'footprint', 'patte', 'empreinte'],
  gesture: 'The four toes press down, one after the other.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    part('toe-1', inset(ellipse(27, 46, 6.5, 8.5, 'main', { rotate: [-20, 27, 46] }))),
    part('toe-2', inset(ellipse(40, 32, 7, 9, 'main', { rotate: [-8, 40, 32] }))),
    part('toe-3', inset(ellipse(56, 32, 7, 9, 'main', { rotate: [8, 56, 32] }))),
    part('toe-4', inset(ellipse(69, 46, 6.5, 8.5, 'main', { rotate: [20, 69, 46] }))),
    // The pad: the accent.
    inset(ellipse(48, 60, 15, 12, 'accent')),
  ],
  motion: {
    ...stagger(['toe-1', 'toe-2', 'toe-3', 'toe-4'], pop({ scale: 1.25, duration: 360 }), 90),
  },
});
