import { draw, icon, part, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'double-check',
  category: 'interface',
  keywords: ['double check', 'read', 'delivered', 'done', 'seen', 'confirmed', 'lu', 'double coche'],
  gesture: 'The two checks draw themselves, one after the other.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part('check-1', plain(stroke('M24 49L34 59L52 38', 'main', 8.5))),
    part('check-2', plain(stroke('M45 58L47 60L70 36', 'accent', 8))),
  ],
  motion: {
    'check-1': draw({ duration: 400 }),
    'check-2': draw({ duration: 400, delay: 300 }),
  },
});
