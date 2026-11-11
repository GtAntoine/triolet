import { blink, circle, icon, inset, part, pill, raised, rect, stagger, wave } from '@triolet/core';
import { flag } from './_shared.ts';

export default icon({
  name: 'server-flag',
  aliases: ['france'],
  category: 'data',
  keywords: ['server', 'hosting', 'datacenter', 'flag', 'sovereign', 'rack', 'serveur', 'hébergement'],
  gesture: 'The flag ripples and the three lights blink one after the other.',
  draw: [
    flag(46.5, 8),
    [36, 54, 72].flatMap((y, k) => [
      raised(rect(20, y, 56, 14, 5, 'base')),
      inset(pill(28, y + 4.5, 24, 5, 'mid')),
      part(`light-${k + 1}`, inset(circle(66, y + 7, 3.2, k === 1 ? 'accent' : 'main'))),
    ]),
  ],
  motion: {
    flag: wave(),
    ...stagger(['light-1', 'light-2', 'light-3'], blink(), 120),
  },
});
