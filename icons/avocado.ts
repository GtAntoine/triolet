import { circle, icon, inset, part, path, pop, raised, resize } from '@triolet/core';

const HALF = 'M48 12C58 12 62 24 64 36C68 44 74 52 74 62A26 24 0 0 1 22 62C22 52 28 44 32 36C34 24 38 12 48 12Z';

export default icon({
  name: 'avocado',
  category: 'social',
  keywords: ['avocado', 'fruit', 'food', 'healthy', 'vegan', 'guacamole', 'avocat', 'noyau'],
  gesture: 'The stone of the avocado pops.',
  draw: [
    // The skin, the flesh (the same shape, smaller), then the stone: the accent.
    raised(path(HALF, 'main')),
    ...resize([inset(path(HALF, 'base'))], 0.8, { about: [48, 52] }),
    part('stone', raised.small(circle(48, 60, 11, 'accent'))),
  ],
  motion: {
    stone: pop({ scale: 1.2 }),
  },
});
