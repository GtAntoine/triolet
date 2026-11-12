import { icon, inset, part, pill, raised, rect, travel } from '@triolet/core';

export default icon({
  name: 'copy',
  category: 'interface',
  keywords: ['copy', 'duplicate', 'clone', 'clipboard', 'paste', 'double', 'copier', 'dupliquer'],
  gesture: 'The copy comes out of the original.',
  draw: [
    // The original, dark, behind.
    raised(rect(34, 14, 48, 48, 11, 'main')),
    // The copy, in front: it is what moves.
    part('copy', raised(rect(14, 34, 48, 48, 11, 'base')), inset(pill(24, 48, 20, 8, 'accent')), inset(pill(24, 62, 28, 8, 'mid'))),
  ],
  motion: {
    copy: travel({ from: [14, -14], duration: 550 }),
  },
});
