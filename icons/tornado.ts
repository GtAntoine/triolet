import { icon, nudge, part, pill, raised } from '@triolet/core';

export default icon({
  name: 'tornado',
  category: 'weather',
  keywords: ['tornado', 'storm', 'twister', 'wind', 'cyclone', 'hurricane', 'tornade', 'tempête'],
  gesture: 'The funnel sways, band after band.',
  draw: [
    part('band-1', raised.small(pill(14, 14, 68, 12, 'main'))),
    part('band-2', raised.small(pill(22, 29, 54, 11, 'base'))),
    part('band-3', raised.small(pill(30, 43, 40, 11, 'main'))),
    part('band-4', raised.small(pill(37, 57, 28, 10, 'base'))),
    part('band-5', raised.small(pill(43, 70, 17, 10, 'accent'))),
  ],
  motion: {
    'band-1': nudge({ x: 4, duration: 800, ease: 'inOut' }),
    'band-2': nudge({ x: -4, duration: 800, delay: 60, ease: 'inOut' }),
    'band-3': nudge({ x: 4, duration: 800, delay: 120, ease: 'inOut' }),
    'band-4': nudge({ x: -4, duration: 800, delay: 180, ease: 'inOut' }),
    'band-5': nudge({ x: 5, duration: 800, delay: 240, ease: 'inOut' }),
  },
});
