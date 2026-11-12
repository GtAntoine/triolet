import { icon, inset, part, path, raised, rect, swing } from '@triolet/core';

const FRONT = { rotate: [9, 56, 50] as [number, number, number] };

export default icon({
  name: 'cards',
  category: 'social',
  keywords: ['cards', 'playing', 'game', 'poker', 'deck', 'casino', 'cartes', 'jeu'],
  gesture: 'The card in front fans out, then comes back.',
  draw: [
    raised(rect(20, 18, 40, 56, 8, 'main', { rotate: [-12, 40, 46] })),
    part('front', raised(rect(36, 22, 40, 56, 8, 'base', FRONT)), inset(path('M56 37L66 50L56 63L46 50Z', 'accent', { outline: 2, ...FRONT }))),
  ],
  motion: {
    front: swing({ angles: [10, -3, 0], at: [0.4, 0.75, 0.9], duration: 700, pivot: [50, 80] }),
  },
});
