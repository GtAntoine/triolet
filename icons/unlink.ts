import { icon, nudge, part, plain, raised, stroke } from '@triolet/core';

// One chain link, 44 long and 24 high, around (cx, cy), tilted 45 degrees.
const link = (cx: number, cy: number) => `M${cx - 10} ${cy - 12}H${cx + 10}A12 12 0 0 1 ${cx + 10} ${cy + 12}H${cx - 10}A12 12 0 0 1 ${cx - 10} ${cy - 12}Z`;

export default icon({
  name: 'unlink',
  category: 'interface',
  keywords: ['unlink', 'broken link', 'disconnect', 'detach', 'remove link', 'separate', 'délier', 'lien rompu'],
  gesture: 'The two links pull apart.',
  draw: [
    part('link-1', raised(stroke(link(33, 63), 'main', 8, { rotate: [-45, 33, 63] }))),
    part('link-2', raised(stroke(link(63, 33), 'mid', 8, { rotate: [-45, 63, 33] }))),
    // The cut, between them.
    plain(stroke('M39 39L57 57', 'gap', 13)),
    raised.small(stroke('M39 39L57 57', 'accent', 6.5)),
  ],
  motion: {
    'link-1': nudge({ x: -4, y: 4, duration: 600, ease: 'inOut' }),
    'link-2': nudge({ x: 4, y: -4, duration: 600, ease: 'inOut' }),
  },
});
