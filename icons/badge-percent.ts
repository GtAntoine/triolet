import { circle, icon, inset, part, plain, pop, raised, stroke } from '@triolet/core';

const scallops = Array.from({ length: 8 }, (_, i) => {
  const angle = (Math.PI / 4) * i;
  return circle(Math.round((48 + 24 * Math.cos(angle)) * 10) / 10, Math.round((48 + 24 * Math.sin(angle)) * 10) / 10, 12, 'main');
});

export default icon({
  name: 'badge-percent',
  aliases: ['rosette-discount'],
  category: 'commerce',
  keywords: ['discount', 'percent', 'sale', 'offer', 'promo', 'deal', 'réduction', 'promotion'],
  gesture: 'The percent sign pops on the badge.',
  draw: [
    raised(circle(48, 48, 27, 'main'), ...scallops),
    inset(circle(48, 48, 24, 'base')),
    part('sign', plain(stroke('M56 38L40 58', 'accent', 5.5), circle(40, 40, 4.5, 'accent'), circle(56, 56, 4.5, 'accent'))),
  ],
  motion: {
    sign: pop({ scale: 1.2, duration: 450 }),
  },
});
