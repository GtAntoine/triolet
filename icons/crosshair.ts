import { blink, circle, icon, inset, part, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'crosshair',
  aliases: ['locate'],
  category: 'interface',
  keywords: ['crosshair', 'target', 'aim', 'focus', 'locate', 'precision', 'viseur', 'cible'],
  gesture: 'The sight tightens on its point.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part(
      'sight',
      inset(ring(48, 48, 18, 'main', 6)),
      inset(stroke('M48 20V28', 'main', 6), stroke('M48 68V76', 'main', 6), stroke('M20 48H28', 'main', 6), stroke('M68 48H76', 'main', 6)),
    ),
    part('point', inset(circle(48, 48, 6, 'accent'))),
  ],
  motion: {
    sight: pop({ scale: 1.15, duration: 500 }),
    point: blink({ to: 0.2, delay: 150, duration: 500 }),
  },
});
