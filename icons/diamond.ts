import { icon, inset, part, path, plain, raised, spin } from '@triolet/core';
import { starPath } from './_shared.ts';

export default icon({
  name: 'diamond',
  category: 'commerce',
  keywords: ['diamond', 'gem', 'jewel', 'premium', 'value', 'luxury', 'diamant', 'joyau'],
  gesture: 'A sparkle turns on the gem.',
  draw: [
    raised(path('M30 24H66L82 42L48 82L14 42Z', 'base', { outline: 4 })),
    inset(path('M37 42H59L48 68Z', 'main', { outline: 3 })),
    inset(path('M33 28H63L70 37H26Z', 'soft', { outline: 2 })),
    part('sparkle', plain(path(starPath(72, 22, 12, 5.5), 'gap', { outline: 8 })), raised.small(path(starPath(72, 22, 10, 4.5), 'accent', { outline: 4 }))),
  ],
  motion: {
    sparkle: spin({ turns: 1, duration: 800, ease: 'out' }),
  },
});
