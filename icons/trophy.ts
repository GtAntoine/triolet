import { bounce, icon, inset, part, path, raised, rect, spin, stroke } from '@triolet/core';
import { starPath } from './_shared.ts';

export default icon({
  name: 'trophy',
  category: 'social',
  keywords: ['trophy', 'award', 'winner', 'cup', 'prize', 'champion', 'trophée', 'récompense'],
  gesture: 'The cup jumps and its star turns.',
  draw: [
    raised(rect(28, 70, 40, 14, 5, 'base')),
    part(
      'cup',
      raised.small(stroke('M30 22H20V27A12 12 0 0 0 32 39M66 22H76V27A12 12 0 0 1 64 39', 'main', 5), rect(44, 52, 8, 20, 0, 'main')),
      raised(path('M28 14H68V34A20 20 0 0 1 28 34Z', 'main', { outline: 3 })),
      part('star', inset(path(starPath(48, 32, 8.5, 4), 'accent', { outline: 2 }))),
    ),
  ],
  motion: {
    cup: bounce({ height: 6, duration: 650 }),
    star: spin({ turns: 1, duration: 700, ease: 'out', pivot: [48, 32] }),
  },
});
