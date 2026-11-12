import { icon, inset, part, path, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'tv',
  category: 'devices',
  keywords: ['tv', 'television', 'screen', 'watch', 'show', 'channel', 'télévision', 'télé'],
  gesture: 'The play triangle pops on the screen.',
  draw: [
    raised.small(stroke('M36 10L48 23L60 10', 'main', 5.5), stroke('M30 74L26 84', 'main', 6), stroke('M66 74L70 84', 'main', 6)),
    raised(rect(10, 22, 76, 52, 11, 'main')),
    inset(rect(16, 28, 64, 40, 6, 'base')),
    part('play', inset(path('M42 39L57 48L42 57Z', 'accent', { outline: 4 }))),
  ],
  motion: {
    play: pop({ scale: 1.25, duration: 480 }),
  },
});
