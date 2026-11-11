import { draw, icon, inset, part, path, pill, plain, pop, raised, stroke } from '@triolet/core';

export default icon({
  name: 'file-shield',
  aliases: ['conformite'],
  category: 'security',
  keywords: ['compliance', 'shield', 'verified', 'document', 'gdpr', 'certified', 'conformité', 'bouclier'],
  gesture: 'The shield lands on the file and its check draws itself.',
  draw: [
    raised(path('M24 10H54L70 26V76A8 8 0 0 1 62 84H24A8 8 0 0 1 16 76V18A8 8 0 0 1 24 10Z', 'base')),
    raised.small(path('M54 10L70 26H59A5 5 0 0 1 54 21Z', 'accent')),
    ([
      [32, 26],
      [41, 32],
      [50, 18],
    ] as const).map(([y, w]) => inset(pill(24, y, w, 5, 'mid'))),
    part(
      'shield',
      raised(path('M67 49L84 55.5V67C84 77 77 84 67 88C57 84 50 77 50 67V55.5Z', 'main')),
      part('check', plain(stroke('M59.5 68.5L64.5 73.5L74 63', 'on', 4))),
    ),
  ],
  motion: {
    shield: pop({ duration: 450 }),
    check: draw({ duration: 450, delay: 100 }),
  },
});
