import { circle, icon, inset, part, path, raised, ring, swing } from '@triolet/core';
import { starPath } from './_shared.ts';

export default icon({
  name: 'medal',
  category: 'social',
  keywords: ['medal', 'award', 'winner', 'prize', 'achievement', 'rank', 'médaille', 'récompense'],
  gesture: 'The medal swings on its ribbon.',
  draw: [
    raised(path('M28 10H44L56 40H40Z', 'main', { outline: 2 }), path('M68 10H52L40 40H56Z', 'main', { outline: 2 })),
    part(
      'medal',
      raised(circle(48, 60, 25, 'base')),
      inset(ring(48, 60, 18, 'mid', 3.5)),
      inset(path(starPath(48, 60, 11, 5), 'accent', { outline: 2 })),
    ),
  ],
  motion: {
    medal: swing({ angles: [9, -7, 4, -2], duration: 850, pivot: [48, 24] }),
  },
});
