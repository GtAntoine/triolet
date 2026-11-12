import { circle, draw, icon, part, plain, raised, stroke } from '@triolet/core';

export default icon({
  name: 'wifi-off',
  category: 'devices',
  keywords: ['wifi', 'offline', 'disconnected', 'no signal', 'network', 'internet', 'hors ligne', 'déconnecté'],
  gesture: 'The bar crosses out the signal.',
  draw: [
    raised(stroke('M16 36A45 45 0 0 1 80 36', 'mid', 8)),
    raised(stroke('M27 48A30 30 0 0 1 69 48', 'mid', 8)),
    raised(stroke('M38 60A15 15 0 0 1 58 60', 'main', 8)),
    raised.small(circle(48, 72, 7.5, 'accent')),
    part('bar', plain(stroke('M22 80L74 18', 'gap', 13)), raised.small(stroke('M22 80L74 18', 'main', 7))),
  ],
  motion: {
    bar: draw({ duration: 450 }),
  },
});
