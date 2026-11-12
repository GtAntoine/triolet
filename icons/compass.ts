import { circle, icon, inset, part, path, plain, raised, swing } from '@triolet/core';

export default icon({
  name: 'compass',
  category: 'places',
  keywords: ['compass', 'direction', 'navigate', 'north', 'explore', 'orientation', 'boussole', 'nord'],
  gesture: 'The needle swings, then finds north again.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    inset(circle(48, 48, 28, 'base')),
    // The needle: its north half is the accent.
    part(
      'needle',
      raised.small(
        path('M48 25L56 48H40Z', 'accent', { outline: 2, rotate: [40, 48, 48] }),
        path('M40 48H56L48 71Z', 'main', { outline: 2, rotate: [40, 48, 48] }),
      ),
      plain(circle(48, 48, 3.5, 'on')),
    ),
  ],
  motion: {
    needle: swing({ angles: [32, -22, 12, -5], duration: 900, pivot: [48, 48] }),
  },
});
