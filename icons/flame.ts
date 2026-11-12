import { icon, part, path, pill, raised, tracks } from '@triolet/core';

export default icon({
  name: 'flame',
  category: 'weather',
  keywords: ['flame', 'fire', 'hot', 'burn', 'trending', 'heat', 'flamme', 'feu'],
  gesture: 'The flame flickers.',
  draw: [
    raised(pill(22, 76, 52, 10, 'base')),
    part('fire', raised(path('M48 10C52 24 68 33 68 53A20 20 0 0 1 28 53C28 45 32 39 36 35C38 41 42 43 44 41C42 31 44 19 48 10Z', 'main'))),
    part('heart', raised.small(path('M48 44C52 50 57 55 57 62A9 9 0 0 1 39 62C39 55 44 50 48 44Z', 'accent'))),
  ],
  motion: {
    fire: tracks({ duration: 800, pivot: 'bottom' }, { scaleY: [[0.3, 1.06], [0.6, 0.96]], skewY: [[0.3, -3], [0.6, 3]] }),
    heart: tracks({ duration: 800, pivot: 'bottom' }, { scaleY: [[0.25, 1.25], [0.5, 0.85], [0.75, 1.15]] }),
  },
});
