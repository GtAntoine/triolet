import { ellipse, icon, nudge, part, path, raised, stroke } from '@triolet/core';

export default icon({
  name: 'balloon',
  category: 'social',
  keywords: ['balloon', 'party', 'birthday', 'celebrate', 'festive', 'fun', 'ballon', 'fête'],
  gesture: 'The balloon in front rises a little, then comes back.',
  draw: [
    // The two strings, then the balloon behind.
    raised.small(stroke('M33 64C33 73 45 76 46 86', 'main', 3.5), stroke('M57 75C57 80 49 80 47 86', 'main', 3.5)),
    raised(ellipse(33, 36, 19, 23, 'main')),
    raised.small(path('M29 58H37L33 64Z', 'main', { outline: 2 })),
    // The balloon in front, with its knot: the accent.
    part('balloon', raised(ellipse(57, 41, 23, 28, 'base')), raised.small(path('M52 68H62L57 75Z', 'accent', { outline: 3 }))),
  ],
  motion: {
    balloon: nudge({ y: -6, duration: 800, ease: 'inOut' }),
  },
});
