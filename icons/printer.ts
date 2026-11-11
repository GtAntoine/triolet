import { circle, clip, icon, inset, part, pill, raised, rect, travel } from '@triolet/core';

export default icon({
  name: 'printer',
  category: 'devices',
  keywords: ['printer', 'print', 'paper', 'document', 'office', 'copy', 'imprimante', 'imprimer'],
  gesture: 'The printed sheet comes out.',
  draw: [
    raised(rect(26, 12, 44, 30, 6, 'main')),
    raised(rect(12, 34, 72, 36, 10, 'base')),
    inset(pill(24, 58, 48, 6, 'main')),
    inset(circle(72, 45, 4.5, 'accent')),
    // The sheet appears under the slot.
    clip(rect(0, 61, 96, 35, 0, 'base'), part('sheet', raised.small(rect(28, 60, 40, 26, 4, 'base')), inset(pill(35, 70, 26, 5, 'mid')))),
  ],
  motion: {
    sheet: travel({ from: [0, -16], duration: 700 }),
  },
});
