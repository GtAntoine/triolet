import { circle, icon, inset, part, path, raised, stroke, wave } from '@triolet/core';

export default icon({
  name: 'flag',
  category: 'interface',
  keywords: ['flag', 'report', 'mark', 'country', 'milestone', 'goal', 'drapeau', 'signaler'],
  gesture: 'The flag ripples in the wind.',
  draw: [
    raised.small(stroke('M22 16V84', 'main', 7), circle(22, 13, 5, 'main')),
    part('cloth', raised(path('M26 20C38 14 50 28 64 22C70 20 76 20 82 22V54C76 52 70 52 64 54C50 60 38 46 26 52Z', 'base')), inset(circle(53, 37, 8, 'accent'))),
  ],
  motion: {
    cloth: wave(),
  },
});
