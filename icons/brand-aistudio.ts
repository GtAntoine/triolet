// Written by tools/brands/hand.py. Do not edit.
// The Google AI Studio mark is a trademark of its owner; this is a simplified drawing of it.
import { icon, inset, part, path, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'brand-aistudio',
  category: 'brands',
  keywords: ['aistudio', 'brand', 'logo', 'ai', 'google', 'marque', 'logo de marque'],
  gesture: 'The Google AI Studio mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', plain(stroke('M45 29H40A6 6 0 0 0 34 35V49A6 6 0 0 0 40 55H54A6 6 0 0 0 60 49V45', 'on', 4)), plain(path('M57 21C57.7 25.5 61.5 29.3 66 30C61.5 30.7 57.7 34.5 57 39C56.3 34.5 52.5 30.7 48 30C52.5 29.3 56.3 25.5 57 21Z', 'on', { outline: 1.5 }))),
  ],
  motion: {
    mark: pop({ scale: 1.12, duration: 450, pivot: [48, 40] }),
  },
});
