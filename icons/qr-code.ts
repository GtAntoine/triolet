import { icon, inset, part, pop, raised, rect } from '@triolet/core';

const finders: [number, number][] = [
  [22, 22],
  [54, 22],
  [22, 54],
];

export default icon({
  name: 'qr-code',
  category: 'commerce',
  keywords: ['qr code', 'scan', 'link', 'ticket', 'payment', 'code', 'code qr', 'scanner'],
  gesture: 'One square of the code lights up.',
  draw: [
    raised(rect(14, 14, 68, 68, 11, 'base')),
    finders.flatMap(([x, y]) => [inset(rect(x, y, 20, 20, 5, 'main')), inset(rect(x + 6.5, y + 6.5, 7, 7, 2, 'base'))]),
    inset(rect(54, 54, 8, 8, 2.5, 'main'), rect(66, 66, 8, 8, 2.5, 'main'), rect(54, 66, 8, 8, 2.5, 'mid')),
    part('square', inset(rect(66, 54, 8, 8, 2.5, 'accent'))),
  ],
  motion: {
    square: pop({ scale: 1.5, duration: 450 }),
  },
});
