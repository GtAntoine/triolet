// Written by tools/brands/hand.py. Do not edit.
// The Midjourney mark is a trademark of its owner; this is a simplified drawing of it.
import { icon, inset, part, path, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'brand-midjourney',
  category: 'brands',
  keywords: ['midjourney', 'brand', 'logo', 'ai', 'image', 'marque', 'logo de marque'],
  gesture: 'The Midjourney mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', plain(path('M39 23C50 29 56 38 57 49H37C42 41 43 32 39 23Z', 'on'), path('M52 27C59 32 63 40 64 49H61C60 41 57 33 52 27Z', 'on')), plain(stroke('M33 54C36.5 51.5 40 56.5 44 54C48 51.5 51.5 56.5 55.5 54C59 51.5 62 55 65 53.5', 'on', 3.5))),
  ],
  motion: {
    mark: pop({ scale: 1.12, duration: 450, pivot: [48, 40] }),
  },
});
