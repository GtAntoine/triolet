import { circle, icon, inset, part, path, plain, raised, rect, stroke, tracks } from '@triolet/core';

export default icon({
  name: 'dino',
  aliases: ['dinosaur'],
  category: 'social',
  keywords: ['dino', 'dinosaur', 'trex', 'game', 'offline', 'fossil', 'dinosaure', 'jeu'],
  gesture: 'The dino jumps, as in the game.',
  draw: [
    part(
      'dino',
      // The spikes of the back, behind: the accent.
      raised.small(circle(40, 22, 7, 'accent'), circle(29, 34, 7.5, 'accent'), circle(24, 48, 7, 'accent')),
      raised.small(rect(36, 68, 10, 18, 4, 'main'), rect(51, 68, 10, 18, 4, 'main')),
      // Head, body and tail, as one shape.
      raised(rect(44, 10, 38, 28, 11, 'base'), rect(28, 30, 36, 44, 16, 'base'), path('M32 50L10 68A4 4 0 0 0 12 74H36Z', 'base', { outline: 2 })),
      inset(circle(67, 21, 4.5, 'main')),
      plain(stroke('M66 31H80', 'main', 4), stroke('M62 48H71', 'main', 5.5)),
    ),
  ],
  motion: {
    dino: tracks({ duration: 700, ease: 'inOut' }, { y: [[0.4, -10], [0.8, 0]] }),
  },
});
