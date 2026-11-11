import { circle, icon, part, path, raised, resize, swing, tracks } from '@triolet/core';

const lean = { at: [0.5], pivot: 'bottom', duration: 800 } as const;

export default icon({
  name: 'neighbours',
  aliases: ['confiance'],
  category: 'people',
  keywords: ['trust', 'neighbours', 'heart', 'community', 'care', 'together', 'confiance', 'voisins'],
  gesture: 'The heart beats twice and the two neighbours lean towards each other.',
  draw: resize(
    [
      part('neighbour-1', raised(circle(30, 50, 9, 'main'), path('M11 87V82A19 19 0 0 1 49 82V87Z', 'main'))),
      part('neighbour-2', raised(circle(66, 50, 9, 'soft'), path('M47 87V82A19 19 0 0 1 85 82V87Z', 'soft'))),
      part(
        'heart',
        resize([raised.small(path('M48 38C35 30 29 24 29 17.5A9.5 9.5 0 0 1 48 14A9.5 9.5 0 0 1 67 17.5C67 24 61 30 48 38Z', 'accent'))], 0.62, { about: [48, 36] }),
      ),
    ],
    0.9,
    { move: [0, -3] },
  ),
  motion: {
    'neighbour-1': swing({ ...lean, angles: [5] }),
    'neighbour-2': swing({ ...lean, angles: [-5] }),
    // Two beats, the second smaller: no shortcut says that.
    heart: tracks({ duration: 800, ease: 'inOut' }, { scale: [[0.2, 1.2], [0.4, 1], [0.6, 1.12]] }),
  },
});
