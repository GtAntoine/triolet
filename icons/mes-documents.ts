import { icon, inset, nudge, part, path, pill, raised } from '@triolet/core';

export default icon({
  name: 'mes-documents',
  category: 'documents',
  keywords: ['folder', 'documents', 'files', 'archive', 'directory', 'storage', 'dossier', 'fichiers'],
  gesture: 'The sheet comes out of the folder and slides back.',
  draw: [
    raised(path('M14 32A6 6 0 0 1 20 26H35L41 32H72A6 6 0 0 1 78 38V76A6 6 0 0 1 72 82H20A6 6 0 0 1 14 76Z', 'main')),
    part(
      'sheet',
      raised.small(path('M35 12H60L70 22V62H29V18A6 6 0 0 1 35 12Z', 'base'), path('M60 12L70 22H63A3 3 0 0 1 60 19Z', 'accent')),
      inset(pill(35, 27, 20, 5, 'mid')),
      inset(pill(35, 36, 26, 5, 'mid')),
    ),
    raised(path('M25 46H81A4 4 0 0 1 84.9 50.9L79 78A6 6 0 0 1 73 82H19A4 4 0 0 1 15.1 77.1L21 50A5 5 0 0 1 25 46Z', 'mainLight')),
  ],
  motion: {
    sheet: nudge({ y: -6, settle: true, duration: 600 }),
  },
});
