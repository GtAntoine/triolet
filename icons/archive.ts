import { icon, inset, nudge, part, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'archive',
  category: 'documents',
  keywords: ['archive', 'box', 'storage', 'store', 'history', 'backup', 'archiver', 'carton'],
  gesture: 'The lid of the box lifts and closes.',
  draw: [
    raised(rect(17, 32, 62, 52, 9, 'base')),
    inset(pill(37, 50, 22, 8, 'accent')),
    part('lid', raised(rect(11, 18, 74, 18, 7, 'main'))),
  ],
  motion: {
    lid: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
