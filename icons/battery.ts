import { icon, inset, part, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'battery',
  category: 'devices',
  keywords: ['battery', 'charge', 'power', 'energy', 'level', 'low', 'batterie', 'énergie'],
  gesture: 'The battery fills up cell by cell.',
  draw: [
    raised.small(rect(76, 40, 10, 16, 4, 'main')),
    raised(rect(10, 28, 68, 40, 10, 'base')),
    part('cell-1', inset(rect(17, 35, 15, 26, 4, 'main'))),
    part('cell-2', inset(rect(36.5, 35, 15, 26, 4, 'main'))),
    part('cell-3', inset(rect(56, 35, 15, 26, 4, 'accent'))),
  ],
  motion: {
    ...stagger(['cell-1', 'cell-2', 'cell-3'], reveal({ from: 'bottom', amount: 0.15, duration: 400 }), 140),
  },
});
