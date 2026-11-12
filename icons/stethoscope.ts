import { circle, icon, inset, part, raised, stroke, tracks } from '@triolet/core';

export default icon({
  name: 'stethoscope',
  category: 'health',
  keywords: ['stethoscope', 'doctor', 'health', 'medical', 'care', 'diagnosis', 'stéthoscope', 'médecin'],
  gesture: 'The chest piece beats twice.',
  draw: [
    raised(stroke('M24 16V34A17 17 0 0 0 58 34V16M41 51V60A16.5 16.5 0 0 0 74 60V54', 'main', 6)),
    raised.small(circle(24, 14, 4.5, 'main'), circle(58, 14, 4.5, 'main')),
    part('chest', raised.small(circle(74, 44, 10, 'base')), inset(circle(74, 44, 5, 'accent'))),
  ],
  motion: {
    chest: tracks({ duration: 800, ease: 'inOut' }, { scale: [[0.2, 1.25], [0.4, 1], [0.6, 1.15]] }),
  },
});
