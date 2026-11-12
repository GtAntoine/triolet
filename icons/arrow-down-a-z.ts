import { icon, nudge, part, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'arrow-down-a-z',
  category: 'data',
  keywords: ['sort', 'alphabetical', 'letters', 'order', 'a-z', 'arrow', 'trier', 'alphabétique'],
  gesture: 'The arrow points down the order: letters, from A to Z.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    part('arrow', raised.small(stroke('M33 27V67M24 58L33 68L42 58', 'main', 7))),
    plain(stroke('M51 41L57.5 23L64 41M53.5 35H61.5', 'main', 5.5)),
    plain(stroke('M51 53H64L51 71H64', 'accent', 6)),
  ],
  motion: {
    arrow: nudge({ y: 5, settle: true, duration: 500 }),
  },
});
