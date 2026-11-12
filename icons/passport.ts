import { icon, inset, part, pill, pop, raised, rect, ring, stroke } from '@triolet/core';

export default icon({
  name: 'passport',
  category: 'documents',
  keywords: ['passport', 'travel', 'identity', 'border', 'visa', 'document', 'passeport', 'voyage'],
  gesture: 'The emblem of the passport pops.',
  draw: [
    raised(rect(20, 10, 56, 76, 10, 'main')),
    inset(rect(26, 16, 44, 64, 6, 'base')),
    part('emblem', inset(ring(48, 40, 13, 'main', 4.5)), inset(stroke('M35 40H61M48 27V53', 'main', 3.5))),
    inset(pill(32, 61, 32, 9, 'accent')),
    inset(pill(38, 73, 20, 4, 'mid')),
  ],
  motion: {
    emblem: pop({ scale: 1.15, duration: 480, pivot: [48, 40] }),
  },
});
