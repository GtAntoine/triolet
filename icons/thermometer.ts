import { circle, icon, inset, part, raised, rect, reveal, stroke } from '@triolet/core';

export default icon({
  name: 'thermometer',
  category: 'weather',
  keywords: ['thermometer', 'temperature', 'heat', 'fever', 'degrees', 'climate', 'thermomètre', 'température'],
  gesture: 'The temperature rises in the tube.',
  draw: [
    raised.small(stroke('M62 22H70M62 34H70M62 46H70', 'main', 5)),
    raised(circle(44, 68, 17, 'main')),
    raised(rect(34, 10, 20, 62, 10, 'base')),
    inset(circle(44, 68, 7.5, 'accent')),
    part('mercury', inset(rect(41.5, 32, 5, 31, 2.5, 'accent'))),
  ],
  motion: {
    mercury: reveal({ from: 'bottom', amount: 0.25, duration: 700 }),
  },
});
