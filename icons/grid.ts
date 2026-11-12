import { icon, inset, part, pop, raised, rect, stagger } from '@triolet/core';

export default icon({
  name: 'grid',
  category: 'interface',
  keywords: ['grid', 'layout', 'apps', 'tiles', 'dashboard', 'gallery', 'grille', 'mosaïque'],
  gesture: 'The four tiles pop, one after the other.',
  draw: [
    part('tile-1', raised(rect(13, 13, 32, 32, 10, 'main'))),
    part('tile-2', raised(rect(51, 13, 32, 32, 10, 'base'))),
    part('tile-3', raised(rect(13, 51, 32, 32, 10, 'base'))),
    part('tile-4', raised(rect(51, 51, 32, 32, 10, 'base')), inset(rect(59, 59, 16, 16, 5, 'accent'))),
  ],
  motion: {
    ...stagger(['tile-1', 'tile-2', 'tile-3', 'tile-4'], pop({ scale: 1.12, duration: 380 }), 90),
  },
});
