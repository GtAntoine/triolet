import { circle, icon, inset, part, raised, stroke, tracks } from '@triolet/core';

export default icon({
  name: 'stethoscope',
  category: 'health',
  keywords: ['stethoscope', 'doctor', 'health', 'medical', 'care', 'diagnosis', 'stéthoscope', 'médecin'],
  gesture: 'The chest piece beats twice.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised(stroke('M24 16V34A17 17 0 0 0 58 34V16M41 51V60A16.5 16.5 0 0 0 74 60V54', 'main', 6)),
    raised.small(circle(24, 14, 4.5, 'main'), circle(58, 14, 4.5, 'main')),
    part('chest', raised.small(circle(74, 44, 13, 'base')), inset(circle(74, 44, 9, 'accent'))),
  ],
  motion: {
    chest: tracks({ duration: 800, ease: 'inOut' }, { scale: [[0.2, 1.25], [0.4, 1], [0.6, 1.15]] }),
  },
});
