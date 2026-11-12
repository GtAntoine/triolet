// Written by tools/brands/hand.py. Do not edit.
// The Grok mark is a trademark of its owner; this is a simplified drawing of it.
import { icon, inset, part, pill, plain, pop, raised, rect, ring, stroke } from '@triolet/core';

export default icon({
  name: 'brand-grok',
  category: 'brands',
  keywords: ['grok', 'brand', 'logo', 'ai', 'xai', 'marque', 'logo de marque'],
  gesture: 'The Grok mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', plain(ring(48, 40, 10.5, 'on', 4.5)), plain(stroke('M34 55L62 25', 'main', 9)), plain(stroke('M34 55L62 25', 'on', 3.5))),
  ],
  motion: {
    mark: pop({ scale: 1.12, duration: 450, pivot: [48, 40] }),
  },
});
