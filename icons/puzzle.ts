import { circle, icon, inset, nudge, part, raised, rect } from '@triolet/core';

export default icon({
  name: 'puzzle',
  category: 'interface',
  keywords: ['puzzle', 'plugin', 'extension', 'piece', 'module', 'addon', 'pièce', 'greffon'],
  gesture: 'The piece clicks into place.',
  draw: [
    part(
      'piece',
      raised(rect(18, 30, 56, 54, 9, 'base'), circle(46, 25, 11, 'base'), circle(78, 57, 10, 'base')),
      inset(circle(19, 57, 11, 'main')),
      inset(circle(46, 60, 7, 'accent')),
    ),
  ],
  motion: {
    piece: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
