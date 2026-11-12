import { draw, icon, inset, part, pill, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'ampersand',
  category: 'documents',
  keywords: ['ampersand', 'and', 'symbol', 'character', 'text', 'typography', 'esperluette', 'et'],
  gesture: 'The ampersand writes itself above its line.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(28, 66, 40, 8, 'accent')),
    part('sign', plain(stroke('M61.5 58L40.8 34.6C37.2 30.1 38.1 22 46.2 22C52.5 22 54.3 29.2 50.7 32.8L39.9 41.8C33.6 47.2 36.3 58 46.2 58C53.4 58 58.8 52.6 60.6 43.6', 'main', 7))),
  ],
  motion: {
    sign: draw({ duration: 700 }),
  },
});
