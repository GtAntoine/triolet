import { icon, inset, part, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'command',
  category: 'interface',
  keywords: ['command', 'cmd', 'key', 'shortcut', 'keyboard', 'mac', 'commande', 'raccourci'],
  gesture: 'The key is struck: its sign pops.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    part(
      'sign',
      inset(stroke('M40 40V34A6.5 6.5 0 1 0 33.5 40H62.5A6.5 6.5 0 1 0 56 34V62A6.5 6.5 0 1 0 62.5 56H33.5A6.5 6.5 0 1 0 40 62Z', 'main', 5.5)),
      inset(rect(43, 43, 10, 10, 2.5, 'accent')),
    ),
  ],
  motion: {
    sign: pop({ scale: 1.15, duration: 450 }),
  },
});
