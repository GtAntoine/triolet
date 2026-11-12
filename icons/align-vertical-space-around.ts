import { icon, inset, part, pill, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'align-vertical-space-around',
  category: 'design',
  keywords: ['align', 'vertical', 'space', 'distribute', 'layout', 'center', 'répartir', 'espacement'],
  gesture: 'The block settles between its two lines.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(24, 23, 48, 8, 'main'), pill(24, 65, 48, 8, 'main')),
    part('block', inset(rect(34, 39, 28, 18, 6, 'accent'))),
  ],
  motion: {
    block: pop({ scale: 1.12, duration: 450 }),
  },
});
