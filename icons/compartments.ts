import { icon, inset, nudge, part, path, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'compartments',
  aliases: ['cloisonnement'],
  category: 'security',
  keywords: ['isolation', 'tenants', 'partition', 'compartments', 'houses', 'separate', 'cloisonnement', 'communes'],
  gesture: 'Each house moves alone in its own compartment.',
  draw: [
    [6, 34.5, 63].flatMap((x, k) => {
      const hx = x + 4;
      const middle = k === 1;
      return [
        inset(rect(x, 28, 27, 60, 8, 'soft')),
        part(
          `house-${k + 1}`,
          raised(path(`M${hx} 52L${hx + 9.5} 43L${hx + 19} 52V78A3 3 0 0 1 ${hx + 16} 81H${hx + 3}A3 3 0 0 1 ${hx} 78Z`, middle ? 'main' : 'base')),
          raised.small(stroke(`M${hx - 2} 53L${hx + 9.5} 41L${hx + 21} 53`, 'main', 5)),
          inset(path(`M${hx + 6} 81V71A3.5 3.5 0 0 1 ${hx + 13} 71V81Z`, middle ? 'accent' : 'main')),
        ),
      ];
    }),
  ],
  motion: {
    ...stagger(['house-1', 'house-2', 'house-3'], nudge({ y: -6, settle: true, duration: 450 }), 100),
  },
});
