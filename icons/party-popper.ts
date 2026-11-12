import { circle, icon, inset, part, path, pop, raised, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'party-popper',
  category: 'social',
  keywords: ['party', 'popper', 'celebrate', 'confetti', 'congrats', 'tada', 'fête', 'confettis'],
  gesture: 'The confetti burst out of the popper.',
  draw: [
    raised(path('M12 84L32 32L64 64Z', 'base', { outline: 4 })),
    inset(stroke('M26 50L46 70', 'main', 6), stroke('M20 66L30 76', 'main', 6)),
    part('confetti-1', raised.small(circle(58, 24, 6, 'accent'))),
    part('confetti-2', raised.small(stroke('M70 46C76 44 78 50 84 48', 'main', 5))),
    part('confetti-3', raised.small(circle(78, 30, 5, 'accent'))),
    part('confetti-4', raised.small(stroke('M44 12C48 16 44 20 48 24', 'main', 5))),
    part('confetti-5', raised.small(circle(72, 64, 4.5, 'accent'))),
  ],
  motion: {
    ...stagger(['confetti-1', 'confetti-2', 'confetti-3', 'confetti-4', 'confetti-5'], pop({ scale: 1.5, duration: 400 }), 80),
  },
});
