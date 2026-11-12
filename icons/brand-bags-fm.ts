// Written by tools/brands/hand.py. Do not edit.
// The Bags mark is a trademark of its owner; this is a simplified drawing of it.
import { icon, inset, part, path, pill, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'brand-bags-fm',
  category: 'brands',
  keywords: ['bags fm', 'brand', 'logo', 'crypto', 'money', 'marque', 'logo de marque'],
  gesture: 'The Bags mark pops on its key.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(rect(22, 22, 52, 52, 10, 'main')),
    inset(pill(30, 62, 36, 7, 'accent')),
    part('mark', plain(path('M41 26H55L52 32H44Z', 'on', { outline: 2 }), path('M41 34C35 40 33 45 33 48.5A7 7 0 0 0 40 55.5H56A7 7 0 0 0 63 48.5C63 45 61 40 55 34Z', 'on')), plain(stroke('M51.5 42C50.5 40.5 49 40 48 40C46 40 44.8 41.2 44.8 42.6C44.8 45.6 51.4 44.4 51.4 47.6C51.4 49 50 50.2 48 50.2C46.4 50.2 45 49.5 44.3 48.2M48 38V52', 'main', 3))),
  ],
  motion: {
    mark: pop({ scale: 1.12, duration: 450, pivot: [48, 40] }),
  },
});
