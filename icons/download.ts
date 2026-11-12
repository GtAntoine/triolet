import { icon, inset, nudge, part, path, pill, raised, stroke } from '@triolet/core';

export default icon({
  name: 'download',
  category: 'arrows',
  keywords: ['download', 'save', 'import', 'get', 'file', 'receive', 'télécharger', 'enregistrer'],
  gesture: 'The arrow drops into the tray.',
  draw: [
    raised(path('M14 56H82V72A10 10 0 0 1 72 82H24A10 10 0 0 1 14 72Z', 'base')),
    inset(pill(28, 65, 40, 7, 'main')),
    part('arrow', raised.small(stroke('M48 14V48M34 36L48 50L62 36', 'main', 8)), raised.small(stroke('M48 13V23', 'accent', 8))),
  ],
  motion: {
    arrow: nudge({ y: 6, settle: true, duration: 550 }),
  },
});
