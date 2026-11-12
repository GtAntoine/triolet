import { circle, icon, inset, part, pill, plain, pop, raised, stroke } from '@triolet/core';

export default icon({
  name: 'alarm-plus',
  aliases: ['alarm-clock-plus'],
  category: 'time',
  keywords: ['alarm', 'add', 'new', 'clock', 'reminder', 'wake', 'réveil', 'ajouter'],
  gesture: 'The plus badge pops on the alarm clock.',
  draw: [
    raised.small(stroke('M30 76L24 85', 'main', 6), stroke('M62 78L66 85', 'main', 6)),
    raised.small(pill(13, 13, 24, 13, 'main', { rotate: [-38, 25, 19.5] }), pill(59, 13, 24, 13, 'main', { rotate: [38, 71, 19.5] })),
    raised(circle(48, 52, 30, 'main')),
    inset(circle(48, 52, 24, 'base')),
    plain(stroke('M48 52V38', 'main', 5), stroke('M48 52L39 57', 'main', 5)),
    part('badge', plain(circle(70, 70, 16, 'gap')), raised.small(circle(70, 70, 13, 'accent')), plain(stroke('M63.5 70H76.5M70 63.5V76.5', 'on', 4.5))),
  ],
  motion: {
    badge: pop(),
  },
});
