import { blink, icon, inset, part, path, raised, stroke } from '@triolet/core';

export default icon({
  name: 'church',
  category: 'places',
  keywords: ['church', 'chapel', 'religion', 'worship', 'wedding', 'faith', 'église', 'chapelle'],
  gesture: 'The cross shines twice.',
  draw: [
    part('cross', raised.small(stroke('M48 12V32', 'accent', 5.5), stroke('M41 19H55', 'accent', 5.5))),
    raised(path('M22 54L48 34L74 54V78A6 6 0 0 1 68 84H28A6 6 0 0 1 22 78Z', 'base', { outline: 2 })),
    inset(path('M40 84V68A8 8 0 0 1 56 68V84Z', 'main')),
    raised.small(stroke('M19 55L48 33L77 55', 'main', 7)),
  ],
  motion: {
    cross: blink({ to: 0.2, duration: 450, iterations: 2 }),
  },
});
