import { icon, nudge, part, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-down-1-0',
  category: 'data',
  keywords: ['sort', 'descending', 'numbers', 'order', 'numeric', 'arrow', 'trier', 'décroissant'],
  gesture: 'The arrow points down the order: numbers going down, from 1 to 0.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part('arrow', raised.small(stroke('M33 27V67M24 58L33 68L42 58', 'main', 7))),
    plain(stroke('M59 23V41M54 27L59 23M53 41H65', 'main', 5.5)),
    plain(stroke('M52 59A6 6 0 0 1 64 59V65A6 6 0 0 1 52 65Z', 'accent', 6)),
  ],
  motion: {
    arrow: nudge({ y: 5, settle: true, duration: 500 }),
  },
});
