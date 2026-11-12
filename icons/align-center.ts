import { icon, inset, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'align-center',
  category: 'interface',
  keywords: ['align', 'center', 'text', 'paragraph', 'format', 'middle', 'centrer', 'centre'],
  gesture: 'The four lines write themselves, aligned on the centre.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    part('line-1', inset(pill(26, 26, 44, 7, 'accent'))),
    part('line-2', inset(pill(34, 38, 28, 7, 'main'))),
    part('line-3', inset(pill(26, 50, 44, 7, 'main'))),
    part('line-4', inset(pill(38, 62, 20, 7, 'main'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2', 'line-3', 'line-4'], reveal({ duration: 380 }), 80),
  },
});
