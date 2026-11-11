import { icon, inset, nudge, part, plain, raised, rect, stroke } from '@triolet/core';

const bars: [number, number][] = [
  [21, 5],
  [30, 8],
  [42, 4],
  [50, 7],
  [61, 4],
  [69, 6],
];

export default icon({
  name: 'barcode',
  category: 'commerce',
  keywords: ['barcode', 'scan', 'product', 'code', 'stock', 'checkout', 'code-barres', 'scanner'],
  gesture: 'The scanning beam sweeps the bars.',
  draw: [
    raised(rect(12, 22, 72, 52, 10, 'base')),
    bars.map(([x, w]) => inset(rect(x, 32, w, 32, 2, 'main'))),
    part('beam', plain(stroke('M16 48H80', 'accent', 5))),
  ],
  motion: {
    beam: nudge({ y: -12, settle: true, duration: 800, ease: 'inOut' }),
  },
});
