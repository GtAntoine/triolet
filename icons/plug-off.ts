import { circle, icon, inset, part, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'plug-off',
  aliases: ['plug-connected-x'],
  category: 'devices',
  keywords: ['plug', 'unplugged', 'disconnected', 'off', 'power', 'error', 'débranché', 'déconnecté'],
  gesture: 'The cross pops: the plug is disconnected.',
  draw: [
    raised.small(rect(33, 10, 8, 28, 3, 'main'), rect(55, 10, 8, 28, 3, 'main')),
    raised(rect(22, 34, 52, 36, 14, 'base')),
    inset(pill(36, 47, 24, 10, 'mid')),
    raised.small(stroke('M48 70V86', 'main', 8)),
    part('cross', plain(circle(66, 68, 15, 'gap')), raised.small(circle(66, 68, 12, 'accent')), plain(stroke('M61.5 63.5L70.5 72.5M70.5 63.5L61.5 72.5', 'on', 4.5))),
  ],
  motion: {
    cross: pop(),
  },
});
