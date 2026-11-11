import { circle, icon, inset, part, pop, raised, stroke, travel } from '@triolet/core';

export default icon({
  name: 'target',
  category: 'work',
  keywords: ['target', 'goal', 'aim', 'objective', 'focus', 'bullseye', 'cible', 'objectif'],
  gesture: 'The dart flies in and the bullseye pops.',
  draw: [
    raised(circle(46, 50, 34, 'base')),
    inset(circle(46, 50, 23, 'main')),
    raised.small(circle(46, 50, 13, 'base')),
    part('bullseye', inset(circle(46, 50, 6, 'accent'))),
    part('dart', raised.small(stroke('M49 47L74 22M66 18V30H78', 'main', 5))),
  ],
  motion: {
    dart: travel({ from: [10, -10], fade: true, duration: 450 }),
    bullseye: pop({ scale: 1.4, duration: 400, delay: 300 }),
  },
});
