import { circle, icon, inset, nudge, part, pill, pop, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'double-authentification',
  category: 'security',
  keywords: ['two-factor', '2fa', 'lock', 'security', 'code', 'phone', 'authentification', 'cadenas'],
  gesture: 'The shackle locks and the code arrives digit by digit on the phone.',
  draw: [
    part('shackle', raised(stroke('M23 44V32A12 12 0 0 1 47 32V44', 'soft', 7))),
    raised(rect(12, 42, 46, 40, 9, 'main')),
    inset(circle(35, 58, 5, 'base'), rect(32.5, 60, 5, 11, 2.5, 'base')),
    raised(rect(54, 24, 30, 60, 8, 'base')),
    inset(pill(64, 30, 10, 3.5, 'mid')),
    ([62, 69, 76] as const).map((cx, k) => part(`digit-${k + 1}`, inset(circle(cx, 56, 3.2, k === 2 ? 'accent' : 'main')))),
  ],
  motion: {
    shackle: nudge({ y: -6, settle: true, duration: 550 }),
    ...stagger(['digit-1', 'digit-2', 'digit-3'], pop({ duration: 350, delay: 100 }), 100),
  },
});
