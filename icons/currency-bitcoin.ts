import { circle, icon, inset, part, plain, pop, raised, ring, stroke } from '@triolet/core';

export default icon({
  name: 'currency-bitcoin',
  aliases: ['coin-bitcoin', 'bitcoin'],
  category: 'finance',
  keywords: ['bitcoin', 'crypto', 'btc', 'cryptocurrency', 'blockchain', 'coin', 'cryptomonnaie', 'monnaie'],
  gesture: 'The bitcoin sign pops on its coin.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    inset(ring(48, 48, 28, 'mid', 3.5)),
    part(
      'sign',
      plain(stroke('M44 23V32M53 23V32M44 64V73M53 64V73', 'accent', 6.5)),
      plain(stroke('M40 32V64M40 32H51A8 8 0 0 1 51 48H40M40 48H53A8 8 0 0 1 53 64H40', 'main', 7.5)),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.15, duration: 480 }),
  },
});
