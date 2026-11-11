import { icon, nudge, part, raised, stroke } from '@triolet/core';

// One chain link, 44 long and 24 high, around (cx, cy), tilted 45 degrees.
const link = (cx: number, cy: number) => `M${cx - 10} ${cy - 12}H${cx + 10}A12 12 0 0 1 ${cx + 10} ${cy + 12}H${cx - 10}A12 12 0 0 1 ${cx - 10} ${cy - 12}Z`;

export default icon({
  name: 'link',
  category: 'interface',
  keywords: ['link', 'url', 'chain', 'connect', 'hyperlink', 'attach', 'lien', 'chaîne'],
  gesture: 'The two links pull apart and join again.',
  draw: [
    part('link-1', raised(stroke(link(35, 61), 'main', 8, { rotate: [-45, 35, 61] }))),
    part('link-2', raised(stroke(link(61, 35), 'mid', 8, { rotate: [-45, 61, 35] }))),
    raised.small(stroke('M41 55L55 41', 'accent', 8)),
  ],
  motion: {
    'link-1': nudge({ x: -4, y: 4, duration: 600, ease: 'inOut' }),
    'link-2': nudge({ x: 4, y: -4, duration: 600, ease: 'inOut' }),
  },
});
