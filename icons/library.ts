import { icon, inset, part, pill, raised, rect, swing } from '@triolet/core';

const LEAN = { rotate: [-13, 64, 78] as [number, number, number] };

export default icon({
  name: 'library',
  category: 'education',
  keywords: ['library', 'books', 'shelf', 'reading', 'collection', 'study', 'bibliothèque', 'livres'],
  gesture: 'The leaning book tips, then leans back.',
  draw: [
    raised(rect(16, 16, 15, 62, 4, 'base')),
    inset(pill(19, 24, 9, 5, 'main'), pill(19, 66, 9, 5, 'main')),
    raised(rect(35, 34, 11, 44, 4, 'accent')),
    part('book', raised(rect(54, 20, 15, 58, 4, 'base', LEAN)), inset(pill(57, 28, 9, 5, 'main', LEAN))),
    raised.small(pill(10, 78, 76, 8, 'main')),
  ],
  motion: {
    book: swing({ angles: [8, -3, 0], duration: 700, pivot: [64, 78] }),
  },
});
