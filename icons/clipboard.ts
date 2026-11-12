import { icon, inset, nudge, part, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'clipboard',
  category: 'documents',
  keywords: ['clipboard', 'copy', 'paste', 'tasks', 'report', 'notes', 'presse-papiers', 'copier'],
  gesture: 'The clip lifts and snaps back.',
  draw: [
    raised(rect(18, 16, 60, 70, 10, 'main')),
    raised.small(rect(25, 25, 46, 53, 5, 'base')),
    inset(pill(32, 40, 32, 6, 'mid')),
    inset(pill(32, 52, 24, 6, 'mid')),
    inset(pill(32, 64, 28, 6, 'mid')),
    part('clip', raised.small(rect(34, 10, 28, 15, 6, 'accent'))),
  ],
  motion: {
    clip: nudge({ y: -5, settle: true, duration: 500 }),
  },
});
