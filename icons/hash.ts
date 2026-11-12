import { icon, part, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'hash',
  category: 'communication',
  keywords: ['hash', 'hashtag', 'number', 'tag', 'channel', 'pound', 'dièse', 'mot-dièse'],
  gesture: 'The sign pops.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part(
      'sign',
      raised.small(stroke('M41 27L36 69', 'main', 7), stroke('M60 27L55 69', 'main', 7), stroke('M28 39H70', 'main', 7)),
      raised.small(stroke('M26 57H68', 'accent', 7)),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.12, duration: 450 }),
  },
});
