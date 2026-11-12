import { circle, icon, inset, part, path, pill, raised, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'id-card',
  category: 'people',
  keywords: ['id', 'card', 'identity', 'badge', 'passport', 'profile', 'carte', 'identité'],
  gesture: 'The two lines of the card are written.',
  draw: [
    // The card and its header band, as one object.
    raised(path('M22 20H74A12 12 0 0 1 86 32V64A12 12 0 0 1 74 76H22A12 12 0 0 1 10 64V32A12 12 0 0 1 22 20Z', 'base'), path('M22 20H74A12 12 0 0 1 86 32V38H10V32A12 12 0 0 1 22 20Z', 'main')),
    // The photo: a head and shoulders, on the left.
    inset(circle(30, 51, 6.5, 'main'), path('M19 70A11 9 0 0 1 41 70V71H19Z', 'main')),
    part('line-1', inset(pill(50, 46, 28, 8, 'accent'))),
    part('line-2', inset(pill(50, 59, 28, 6, 'mid'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2'], reveal({ duration: 400 }), 120),
  },
});
