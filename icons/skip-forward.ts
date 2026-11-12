import { circle, icon, nudge, part, path, pill, raised } from '@triolet/core';

export default icon({
  name: 'skip-forward',
  category: 'media',
  keywords: ['skip', 'forward', 'next', 'track', 'media', 'player', 'suivant', 'piste'],
  gesture: 'The triangle jumps to the bar.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part('triangle', raised.small(path('M30 33L55 48L30 63Z', 'main', { outline: 4 }))),
    raised.small(pill(62, 32, 9, 32, 'accent')),
  ],
  motion: {
    triangle: nudge({ x: 5, settle: true, duration: 480 }),
  },
});
