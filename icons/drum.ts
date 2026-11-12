import { ellipse, icon, inset, part, path, raised, stroke, swing, resize } from '@triolet/core';

export default icon({
  name: 'drum',
  category: 'media',
  keywords: ['drum', 'music', 'percussion', 'beat', 'rhythm', 'band', 'tambour', 'batterie'],
  gesture: 'The two sticks strike the drum, one after the other.',
  draw: resize(
    [
    raised(path('M18 40V66A30 11 0 0 0 78 66V40Z', 'base')),
    inset(stroke('M24 56L36 70L48 58L60 70L72 56', 'mid', 4)),
    raised(ellipse(48, 40, 30, 11, 'main')),
    part('stick-1', raised.small(stroke('M22 12L44 36', 'accent', 6))),
    part('stick-2', raised.small(stroke('M74 12L52 36', 'accent', 6))),
    ],
    1,
    { move: [0, 5] },
  ),
  motion: {
    'stick-1': swing({ angles: [-14, 0], at: [0.4, 0.7], duration: 450, pivot: [22, 12] }),
    'stick-2': swing({ angles: [14, 0], at: [0.4, 0.7], duration: 450, delay: 250, pivot: [74, 12] }),
  },
});
