import { circle, icon, inset, part, pill, pop, raised, rect, reveal, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'presentation',
  aliases: ['formation'],
  category: 'people',
  keywords: ['training', 'presentation', 'board', 'easel', 'course', 'teach', 'formation', 'tableau'],
  gesture: 'The board fills in line by line, then the point pops.',
  draw: [
    raised(stroke('M30 60L21 87M66 60L75 87M48 62V82', 'main', 5)),
    raised(rect(10, 14, 76, 52, 8, 'base')),
    raised.small(pill(40, 8, 16, 9, 'main')),
    ([
      [25, 30],
      [36, 40],
      [47, 22],
    ] as const).map(([y, w], k) => part(`line-${k + 1}`, inset(pill(20, y, w, 6.5, 'mid')))),
    part('point', inset(circle(71, 31, 6.5, 'accent'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2', 'line-3'], reveal({ duration: 400 }), 100),
    point: pop({ duration: 400, delay: 300 }),
  },
});
