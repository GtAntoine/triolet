import { icon, part, path, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'volume-x',
  category: 'media',
  keywords: ['volume', 'mute', 'muted', 'silent', 'sound off', 'speaker', 'muet', 'son coupé'],
  gesture: 'The cross pops: the sound is cut.',
  draw: [
    raised(path('M28 37L48 21A2 2 0 0 1 51 23V73A2 2 0 0 1 48 75L28 59Z', 'base')),
    raised(rect(10, 36, 22, 24, 6, 'main')),
    part('cross', raised.small(stroke('M64 40L80 56M80 40L64 56', 'accent', 6))),
  ],
  motion: {
    cross: pop({ scale: 1.2, duration: 450 }),
  },
});
