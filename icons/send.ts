import { icon, part, path, raised, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'send',
  aliases: ['send-horizontal'],
  category: 'communication',
  keywords: ['send', 'paper plane', 'message', 'submit', 'deliver', 'email', 'envoyer', 'avion'],
  gesture: 'The paper plane takes off and its trail follows.',
  draw: [
    part('trail-1', raised.small(stroke('M20 66L30 56', 'accent', 6))),
    part('trail-2', raised.small(stroke('M30 80L38 72', 'accent', 6))),
    part('plane', raised(path('M84 14L12 40L42 54Z', 'base', { outline: 4 }), path('M84 14L42 54L56 82Z', 'main', { outline: 4 }))),
  ],
  motion: {
    plane: travel({
      via: [
        [8, -8, 0.4],
        [3, -3, 0.7],
      ],
      duration: 700,
    }),
    ...stagger(['trail-1', 'trail-2'], travel({ from: [-6, 6], fade: true, duration: 400, ease: 'outSoft' }), 120),
  },
});
