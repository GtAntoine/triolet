import { icon, part, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'subscript',
  category: 'documents',
  keywords: ['subscript', 'index', 'formula', 'text', 'format', 'chemistry', 'indice', 'formule'],
  gesture: 'The small 2 pops under the x.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    plain(stroke('M26 28L50 56M50 28L26 56', 'main', 7.5)),
    part('index', plain(stroke('M56 55A6.5 6.5 0 0 1 69 55C69 62 56 65 56 72H70', 'accent', 6))),
  ],
  motion: {
    index: pop({ scale: 1.25, duration: 450 }),
  },
});
