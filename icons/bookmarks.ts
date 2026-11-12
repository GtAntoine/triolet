import { circle, icon, inset, nudge, part, path, raised } from '@triolet/core';

export default icon({
  name: 'bookmarks',
  category: 'interface',
  keywords: ['bookmarks', 'saved', 'favorites', 'collection', 'reading-list', 'keep', 'favoris', 'marque-pages'],
  gesture: 'The bookmark behind slides up, then back in place.',
  draw: [
    part('back', raised(path('M42 10H72A8 8 0 0 1 80 18V70L61 58L42 70Z', 'main', { outline: 2 }))),
    raised(path('M26 22H58A8 8 0 0 1 66 30V86L42 71L18 86V30A8 8 0 0 1 26 22Z', 'base', { outline: 2 })),
    inset(circle(42, 44, 8, 'accent')),
  ],
  motion: {
    back: nudge({ y: -6, settle: true, duration: 600 }),
  },
});
