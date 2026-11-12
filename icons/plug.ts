import { icon, inset, nudge, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'plug',
  aliases: ['plug-connected'],
  category: 'devices',
  keywords: ['plug', 'power', 'electric', 'connect', 'socket', 'outlet', 'prise', 'brancher'],
  gesture: 'The plug pushes in, as it is plugged.',
  draw: [
    part(
      'plug',
      raised.small(rect(33, 10, 8, 28, 3, 'main'), rect(55, 10, 8, 28, 3, 'main')),
      raised(rect(22, 34, 52, 36, 14, 'base')),
      inset(pill(36, 47, 24, 10, 'accent')),
      raised.small(stroke('M48 70V86', 'main', 8)),
    ),
  ],
  motion: {
    plug: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
