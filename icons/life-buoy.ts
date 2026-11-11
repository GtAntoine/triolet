import { circle, icon, inset, part, raised, ring, spin } from '@triolet/core';

// Four narrow bands of accent around the buoy: a quarter of its circumference (157.08) each, 6 of it coloured.
const band = 6;
const quarter = 39.27;

export default icon({
  name: 'life-buoy',
  aliases: ['support'],
  category: 'people',
  keywords: ['support', 'help', 'lifebuoy', 'rescue', 'assistance', 'care', 'bouée', 'aide'],
  gesture: 'The lifebuoy turns a quarter of a turn into place.',
  draw: [
    part('buoy', raised(ring(48, 48, 25, 'base', 18), ring(48, 48, 25, 'accent', 18, { dash: [band, quarter - band], dashOffset: band / 2 }))),
    inset(circle(48, 48, 13, 'main')),
  ],
  motion: {
    buoy: spin({ from: -90, duration: 800, ease: 'out' }),
  },
});
