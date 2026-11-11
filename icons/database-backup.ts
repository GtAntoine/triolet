import { circle, ellipse, icon, inset, part, path, plain, pop, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'database-backup',
  aliases: ['sauvegarde'],
  category: 'data',
  keywords: ['backup', 'database', 'night', 'storage', 'save', 'copy', 'sauvegarde', 'base de données'],
  gesture: 'The night passes: the moon tips and the star lights up.',
  draw: [
    raised(path('M14 26A26 8 0 0 1 66 26V70A26 8 0 0 1 14 70Z', 'base')),
    inset(ellipse(40, 26, 26, 8, 'soft')),
    plain(stroke('M14 42A26 8 0 0 0 66 42', 'main', 3), stroke('M14 57A26 8 0 0 0 66 57', 'accent', 3)),
    part(
      'badge',
      plain(circle(69, 68, 19, 'gap')),
      raised.small(circle(69, 68, 16, 'main')),
      // A crescent: a disc of ink, bitten by a disc of the badge's colour.
      part('moon', plain(circle(68, 69, 8, 'on'), circle(72, 65.5, 7, 'main'))),
      part('star', plain(circle(75.5, 75, 1.8, 'accent'))),
    ),
  ],
  motion: {
    moon: swing({ angles: [-24], at: [0.4], duration: 800 }),
    star: pop({ duration: 400, delay: 350 }),
  },
});
