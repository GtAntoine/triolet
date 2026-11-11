import { icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'folder',
  category: 'documents',
  keywords: ['folder', 'directory', 'files', 'documents', 'organise', 'storage', 'dossier', 'répertoire'],
  gesture: 'The front of the folder dips open and closes.',
  draw: [
    // The back, with its tab.
    raised(path('M12 30A6 6 0 0 1 18 24H36L43 31H78A6 6 0 0 1 84 37V72A6 6 0 0 1 78 78H18A6 6 0 0 1 12 72Z', 'main')),
    part('front', raised(rect(12, 38, 72, 40, 7, 'base')), inset(pill(22, 48, 22, 8, 'accent'))),
  ],
  motion: {
    front: nudge({ y: 5, settle: true, duration: 550 }),
  },
});
