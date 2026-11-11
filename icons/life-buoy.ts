import { circle, icon, inset, part, raised, ring, spin } from '@triolet/core';

// The buoy has eight segments: the accent covers every other one.
const segment = 19.63;

export default icon({
  name: 'life-buoy',
  aliases: ['support'],
  category: 'people',
  keywords: ['support', 'help', 'lifebuoy', 'rescue', 'assistance', 'care', 'bouée', 'aide'],
  gesture: 'The lifebuoy turns a quarter of a turn into place.',
  draw: [
    part('buoy', raised(ring(48, 48, 25, 'base', 18), ring(48, 48, 25, 'accent', 18, { dash: [segment, segment], dashOffset: 9.82 }))),
    inset(circle(48, 48, 13, 'soft')),
  ],
  motion: {
    buoy: spin({ from: -90, duration: 800, ease: 'out' }),
  },
});
