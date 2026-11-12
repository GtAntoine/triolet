import { circle, icon, inset, part, pill, plain, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'alarm',
  aliases: ['alarm-clock'],
  category: 'time',
  keywords: ['alarm', 'clock', 'wake', 'ring', 'reminder', 'morning', 'réveil', 'sonnerie'],
  gesture: 'The alarm clock shakes as it rings.',
  draw: [
    part(
      'clock',
      // The feet, behind.
      raised.small(stroke('M30 76L24 85', 'main', 6), stroke('M66 76L72 85', 'main', 6)),
      // The two bells are the accent.
      raised.small(pill(13, 13, 24, 13, 'accent', { rotate: [-38, 25, 19.5] }), pill(59, 13, 24, 13, 'accent', { rotate: [38, 71, 19.5] })),
      raised(circle(48, 52, 30, 'main')),
      inset(circle(48, 52, 24, 'base')),
      plain(stroke('M48 52V38', 'main', 5), stroke('M48 52L58 58', 'main', 5)),
    ),
  ],
  motion: {
    clock: swing({ angles: [5, -5, 4, -4, 2], duration: 650, pivot: 'bottom' }),
  },
});
