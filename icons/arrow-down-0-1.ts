import { icon, nudge, part, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-down-0-1',
  category: 'data',
  keywords: ['sort', 'ascending', 'numbers', 'order', 'numeric', 'arrow', 'trier', 'croissant'],
  gesture: 'The arrow points down the order: numbers going up, from 0 to 1.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part('arrow', raised.small(stroke('M33 27V67M24 58L33 68L42 58', 'main', 7))),
    plain(stroke('M52 29A6 6 0 0 1 64 29V35A6 6 0 0 1 52 35Z', 'main', 5.5)),
    plain(stroke('M59 53V71M54 57L59 53M53 71H65', 'accent', 6)),
  ],
  motion: {
    arrow: nudge({ y: 5, settle: true, duration: 500 }),
  },
});
