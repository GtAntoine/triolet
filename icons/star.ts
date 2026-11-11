import { icon, inset, part, path, plain, raised, spin } from '@triolet/core';
import { starPath } from './_shared.ts';

export default icon({
  name: 'star',
  category: 'social',
  keywords: ['star', 'favourite', 'favorite', 'rating', 'review', 'best', 'étoile', 'favori'],
  gesture: 'The small star turns once on itself.',
  draw: [
    // The outline rounds the points. A light star with a darker heart.
    raised(path(starPath(45, 53, 30, 14), 'base', { outline: 7 })),
    inset(path(starPath(45, 53, 15, 7), 'main', { outline: 4 })),
    // A sparkle in the accent colour, detached by a ring.
    part('sparkle', plain(path(starPath(71, 28, 14, 6.5), 'gap', { outline: 9 })), raised.small(path(starPath(71, 28, 12, 5.5), 'accent', { outline: 4 }))),
  ],
  motion: {
    sparkle: spin({ turns: 1, duration: 800, ease: 'out' }),
  },
});
