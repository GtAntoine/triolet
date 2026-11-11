import { icon, inset, part, path, pill, raised, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'file-text',
  aliases: ['demarches'],
  category: 'documents',
  keywords: ['document', 'file', 'form', 'paperwork', 'page', 'formulaire', 'dossier'],
  gesture: 'The two lines write themselves, one after the other.',
  draw: [
    raised(path('M31 14H60L80 34V70A13 13 0 0 1 67 83H31A13 13 0 0 1 18 70V27A13 13 0 0 1 31 14Z', 'base')),
    part('corner', raised.small(path('M60 14L80 34H65A5 5 0 0 1 60 29Z', 'accent'))),
    part('line-1', inset(pill(30, 50, 26, 9, 'main'))),
    part('line-2', inset(pill(30, 64, 40, 9, 'main'))),
  ],
  motion: {
    ...stagger(['line-1', 'line-2'], reveal({ duration: 450 }), 120),
  },
});
