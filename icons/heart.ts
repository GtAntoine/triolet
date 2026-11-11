import { icon, part, path, plain, raised, resize, tracks } from '@triolet/core';
import { HEART } from './_shared.ts';

export default icon({
  name: 'heart',
  category: 'social',
  keywords: ['heart', 'love', 'like', 'favourite', 'favorite', 'care', 'coeur', 'aimer'],
  gesture: 'The small heart beats twice.',
  draw: [
    resize([raised(path(HEART, 'main'))], 1.75, { about: [48, 23], move: [-4, 21] }),
    // A second, smaller heart in the accent colour, detached by a ring.
    part(
      'beat',
      resize([plain(path(HEART, 'gap'))], 0.98, { about: [48, 23], move: [19, 43] }),
      resize([raised.small(path(HEART, 'accent'))], 0.78, { about: [48, 23], move: [19, 43] }),
    ),
  ],
  motion: {
    beat: tracks({ duration: 800, ease: 'inOut' }, { scale: [[0.2, 1.22], [0.4, 1], [0.6, 1.12]] }),
  },
});
