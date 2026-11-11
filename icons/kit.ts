import { circle, icon, inset, part, path, pill, plain, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'kit',
  category: 'communication',
  keywords: ['poster', 'qr code', 'flyer', 'print', 'scan', 'media kit', 'affiche', 'communication'],
  gesture: 'The code to scan comes forward in front of the poster.',
  draw: [
    part(
      'poster',
      raised(rect(14, 8, 50, 68, 7, 'base')),
      inset(rect(21, 15, 36, 25, 4, 'main')),
      plain(path('M22 39L31 29L37 35L41 31L56 39Z', 'base'), circle(48, 22, 3.5, 'accent')),
      inset(pill(21, 47, 30, 5.5, 'mid')),
      inset(pill(21, 57, 20, 5.5, 'mid')),
    ),
    part(
      'code',
      raised(rect(48, 46, 38, 38, 8, 'main')),
      ([
        [55, 53],
        [70, 53],
        [55, 68],
      ] as const).map(([x, y]) => inset(rect(x, y, 9.5, 9.5, 2.5, 'base'))),
      inset(circle(74.8, 72.8, 4.4, 'accent')),
    ),
  ],
  motion: {
    code: pop({ scale: 1.08, x: -3, y: -4, duration: 550 }),
  },
});
