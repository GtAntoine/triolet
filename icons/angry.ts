import { circle, icon, inset, part, plain, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'angry',
  category: 'social',
  keywords: ['angry', 'mad', 'face', 'emoji', 'upset', 'rage', 'en colère', 'fâché'],
  gesture: 'The face shakes with anger.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    inset(circle(28, 56, 5.5, 'accent'), circle(68, 56, 5.5, 'accent')),
    part(
      'face',
      plain(stroke('M29 34L42 40', 'main', 5.5), stroke('M67 34L54 40', 'main', 5.5)),
      inset(circle(37, 46, 5, 'main'), circle(59, 46, 5, 'main')),
      plain(stroke('M36 66A13 10 0 0 1 60 66', 'main', 5.5)),
    ),
  ],
  motion: {
    face: swing({ angles: [5, -5, 4, -4, 2], duration: 600, pivot: [48, 48] }),
  },
});
