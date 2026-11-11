import { circle, icon, inset, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

const rows = [30, 46, 62];

export default icon({
  name: 'list',
  category: 'interface',
  keywords: ['list', 'items', 'menu', 'bullets', 'tasks', 'lines', 'liste', 'éléments'],
  gesture: 'The lines write themselves one after the other.',
  draw: [
    raised(rect(14, 16, 68, 64, 11, 'base')),
    rows.map((y, k) => inset(circle(28, y + 3.5, 4.5, k === 0 ? 'accent' : 'mid'))),
    rows.map((y, k) => part(`line-${k + 1}`, inset(pill(38, y, k === 1 ? 26 : 34, 7, 'main')))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2', 'line-3'], reveal({ duration: 400 }), 100),
  },
});
