import { circle, icon, nudge, part, path, pill, raised } from '@triolet/core';

export default icon({
  name: 'skip-back',
  category: 'media',
  keywords: ['skip', 'back', 'previous', 'track', 'media', 'player', 'précédent', 'piste'],
  gesture: 'The triangle jumps to the bar.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part('triangle', raised.small(path('M66 33L41 48L66 63Z', 'main', { outline: 4 }))),
    raised.small(pill(25, 32, 9, 32, 'accent')),
  ],
  motion: {
    triangle: nudge({ x: -5, settle: true, duration: 480 }),
  },
});
