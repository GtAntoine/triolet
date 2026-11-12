import { icon, inset, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'external-link',
  category: 'interface',
  keywords: ['external', 'link', 'open', 'new tab', 'outside', 'website', 'lien externe', 'ouvrir'],
  gesture: 'The arrow flies off towards the corner.',
  draw: [
    raised(rect(12, 26, 58, 58, 14, 'base')),
    inset(rect(19, 33, 44, 44, 8, 'main')),
    part('arrow', raised.small(stroke('M46 50L76 20M56 18H78V40', 'accent', 6))),
  ],
  motion: {
    arrow: nudge({ x: 4, y: -4, settle: true, duration: 520 }),
  },
});
