import { circle, draw, icon, inset, part, pill, plain, pop, reveal, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'suivi',
  category: 'tasks',
  keywords: ['progress', 'steps', 'checklist', 'tracking', 'status', 'timeline', 'étapes', 'avancement'],
  gesture: 'The check draws itself, the current step pops and the lines write themselves.',
  draw: [
    inset(circle(26, 26, 10, 'main')),
    part('check', plain(stroke('M21.5 26.3l3.2 3.2 6-6.4', 'on', 3))),
    part('dot', inset(circle(26, 48, 10, 'accent'))),
    inset(circle(26, 70, 10, 'base')),
    [22, 44, 66].map((y, k) => part(`line-${k + 1}`, inset(pill(44, y, 36, 8, 'mid')))),
  ],
  motion: {
    check: draw({ duration: 450, delay: 100 }),
    dot: pop({ duration: 450, delay: 300 }),
    ...stagger(['line-1', 'line-2', 'line-3'], reveal({ duration: 400 }), 100),
  },
});
