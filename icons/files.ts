import { icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'files',
  category: 'documents',
  keywords: ['files', 'documents', 'pages', 'stack', 'multiple', 'papers', 'fichiers', 'pile'],
  gesture: 'The sheet behind slides out, then back under the first one.',
  draw: [
    // The sheet behind, dark, up and to the right.
    part('back', raised(rect(32, 12, 50, 62, 11, 'main'))),
    // The sheet in front, with its folded corner.
    raised(path('M25 24H50L66 40V73A11 11 0 0 1 55 84H25A11 11 0 0 1 14 73V35A11 11 0 0 1 25 24Z', 'base')),
    raised.small(path('M50 24L66 40H54A4 4 0 0 1 50 36Z', 'accent')),
    inset(pill(24, 52, 22, 8, 'mid')),
    inset(pill(24, 66, 32, 8, 'mid')),
  ],
  motion: {
    back: nudge({ x: 5, y: -5, settle: true, duration: 600 }),
  },
});
