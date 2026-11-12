import { circle, icon, nudge, part, raised, rect, ring } from '@triolet/core';

export default icon({
  name: 'stop',
  category: 'media',
  keywords: ['stop', 'halt', 'end', 'square', 'media', 'player', 'arrêter', 'arrêt'],
  gesture: 'The square presses down, and comes back.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    raised.small(ring(48, 48, 28, 'main', 6)),
    part('square', raised.small(rect(36, 36, 24, 24, 7, 'accent'))),
  ],
  motion: {
    square: nudge({ y: 3, duration: 380 }),
  },
});
