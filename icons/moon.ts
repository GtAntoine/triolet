import { circle, icon, inset, part, path, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'moon',
  category: 'weather',
  keywords: ['moon', 'night', 'dark', 'sleep', 'evening', 'dark mode', 'lune', 'nuit'],
  gesture: 'The stars twinkle one after the other.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    raised.small(path('M52 24A25 25 0 1 0 72 56A20 20 0 0 1 52 24Z', 'main')),
    part('star-1', inset(circle(63, 30, 4.5, 'accent'))),
    part('star-2', inset(circle(70, 43, 3, 'accent'))),
  ],
  motion: {
    ...stagger(['star-1', 'star-2'], pop({ scale: 1.6, duration: 450 }), 180),
  },
});
