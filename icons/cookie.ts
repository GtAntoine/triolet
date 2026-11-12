import { circle, icon, inset, part, path, raised, stagger, travel } from '@triolet/core';

export default icon({
  name: 'cookie',
  category: 'social',
  keywords: ['cookie', 'biscuit', 'snack', 'consent', 'privacy', 'tracking', 'gâteau', 'traceur'],
  gesture: 'The crumbs fly off the bite, one after the other.',
  draw: [
    // The biscuit: a disc 72 across (the round keyline) with a bite out of its top right.
    raised(path('M60.5 16A34.5 34.5 0 1 0 80 35.5A16 16 0 0 1 60.5 16Z', 'base', { outline: 3 })),
    // Chocolate chips, pressed into the dough.
    inset(circle(36, 36, 6, 'main')),
    inset(circle(56, 46, 5.5, 'main')),
    inset(circle(33, 59, 5.5, 'main')),
    inset(circle(56, 67, 6, 'main')),
    // The crumbs left by the bite: the accent, and what moves.
    part('crumb-1', raised.small(circle(73, 23, 6, 'accent'))),
    part('crumb-2', raised.small(circle(83, 37, 4, 'accent'))),
  ],
  motion: {
    ...stagger(['crumb-1', 'crumb-2'], travel({ from: [-6, 6], fade: true, duration: 450, ease: 'out' }), 120),
  },
});
