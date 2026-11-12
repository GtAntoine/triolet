import { circle, icon, part, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'history',
  category: 'time',
  keywords: ['history', 'recent', 'past', 'clock', 'undo', 'previous', 'historique', 'récent'],
  gesture: 'The arrow runs back round the clock.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    raised.small(stroke('M48 32V48L59 55', 'main', 6.5)),
    part('arrow', raised.small(stroke('M20 44A28 28 0 1 1 26 66', 'main', 6.5)), raised.small(stroke('M20 30V44H34', 'accent', 6.5))),
  ],
  motion: {
    arrow: spin({ from: 70, duration: 650, pivot: [48, 48] }),
  },
});
