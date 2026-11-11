import { icon, inset, part, path, pill, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'trash',
  category: 'interface',
  keywords: ['trash', 'delete', 'remove', 'bin', 'garbage', 'discard', 'corbeille', 'supprimer'],
  gesture: 'The lid lifts on its hinge and falls back.',
  draw: [
    raised(path('M22 32H74L70 78A7 7 0 0 1 63 84H33A7 7 0 0 1 26 78Z', 'base')),
    [35, 45, 55].map((x) => inset(rect(x, 42, 6, 30, 3, 'main'))),
    part('lid', raised.small(pill(40, 13, 16, 9, 'accent')), raised(pill(16, 20, 64, 11, 'main'))),
  ],
  motion: {
    lid: swing({ angles: [-16, 4], at: [0.4, 0.75], pivot: [18, 30], duration: 650, ease: 'out' }),
  },
});
