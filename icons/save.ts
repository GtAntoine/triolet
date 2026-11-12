import { icon, inset, part, pill, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'save',
  category: 'interface',
  keywords: ['save', 'floppy', 'disk', 'store', 'keep', 'download', 'enregistrer', 'disquette'],
  gesture: 'The label pops: saved.',
  draw: [
    raised(rect(14, 14, 68, 68, 11, 'base')),
    raised.small(rect(28, 14, 38, 26, 5, 'main')),
    inset(pill(54, 20, 7, 14, 'mainLight')),
    inset(rect(24, 52, 48, 30, 6, 'soft')),
    part('label', inset(pill(31, 62, 34, 9, 'accent'))),
  ],
  motion: {
    label: pop({ scale: 1.1, duration: 450 }),
  },
});
