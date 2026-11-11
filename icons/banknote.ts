import { circle, icon, inset, nudge, part, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'banknote',
  category: 'finance',
  keywords: ['banknote', 'money', 'cash', 'bill', 'payment', 'currency', 'billet', 'argent'],
  gesture: 'The note slides off the pile and its seal pops.',
  draw: [
    raised(rect(16, 22, 70, 42, 8, 'main')),
    part(
      'note',
      raised(rect(10, 32, 70, 42, 8, 'base')),
      inset(circle(20, 42, 3.5, 'mid'), circle(70, 64, 3.5, 'mid')),
      inset(circle(45, 53, 11, 'soft')),
      part('seal', inset(circle(45, 53, 5.5, 'accent'))),
    ),
  ],
  motion: {
    note: nudge({ x: -4, y: 4, duration: 600 }),
    seal: pop({ duration: 400, delay: 250 }),
  },
});
