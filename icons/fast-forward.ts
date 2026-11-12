import { icon, nudge, part, path, raised, rect } from '@triolet/core';

export default icon({
  name: 'fast-forward',
  category: 'media',
  keywords: ['fast-forward', 'forward', 'skip', 'speed', 'media', 'player', 'avance rapide', 'accélérer'],
  gesture: 'The two triangles rush forward.',
  draw: [
    raised(rect(10, 22, 76, 52, 16, 'base')),
    part('first', raised.small(path('M26 35L46 48L26 61Z', 'main', { outline: 4 }))),
    part('second', raised.small(path('M52 35L72 48L52 61Z', 'accent', { outline: 4 }))),
  ],
  motion: {
    first: nudge({ x: 5, settle: true, duration: 480 }),
    second: nudge({ x: 5, settle: true, duration: 480, delay: 70 }),
  },
});
