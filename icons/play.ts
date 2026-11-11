import { circle, icon, inset, nudge, part, path, raised } from '@triolet/core';

export default icon({
  name: 'play',
  category: 'media',
  keywords: ['play', 'start', 'video', 'music', 'run', 'launch', 'lecture', 'démarrer'],
  gesture: 'The triangle pushes forward.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    inset(circle(48, 48, 29, 'base')),
    part('triangle', raised.small(path('M42 36L60 48L42 60Z', 'accent', { outline: 6 }))),
  ],
  motion: {
    triangle: nudge({ x: 5, settle: true, duration: 500 }),
  },
});
