import { circle, icon, part, path, pill, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'scale',
  category: 'civic',
  keywords: ['scale', 'balance', 'justice', 'law', 'compare', 'weigh', 'équilibre', 'droit'],
  gesture: 'The scale tips one way, then the other, and settles.',
  draw: [
    raised(stroke('M48 22V76', 'main', 6), pill(30, 74, 36, 9, 'main')),
    part(
      'beam',
      raised.small(stroke('M22 30L13 56M22 30L31 56M74 30L65 56M74 30L83 56', 'mid', 4)),
      raised.small(stroke('M20 30H76', 'main', 7)),
      raised(path('M10 54H34A12 11 0 0 1 10 54Z', 'base'), path('M62 54H86A12 11 0 0 1 62 54Z', 'base')),
    ),
    raised.small(circle(48, 22, 6, 'accent')),
  ],
  motion: {
    beam: swing({ angles: [7, -5, 2], pivot: [48, 30], duration: 900 }),
  },
});
