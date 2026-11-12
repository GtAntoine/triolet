// Written by tools/brands/hand.py. Do not edit.
// The xAI mark is a trademark of its owner; this is a simplified drawing of it.
import { icon, inset, part, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'brand-xai',
  category: 'brands',
  keywords: ['xai', 'brand', 'logo', 'ai', 'grok', 'marque', 'logo de marque'],
  gesture: 'The xAI mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', plain(stroke('M34 27L53 54', 'on', 5.5), stroke('M34 54L41 44', 'on', 5.5), stroke('M49 37L60 27V54', 'on', 5.5))),
  ],
  motion: {
    mark: pop({ scale: 1.12, duration: 450, pivot: [48, 40] }),
  },
});
