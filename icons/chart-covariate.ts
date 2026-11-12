import { circle, draw, icon, inset, part, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'chart-covariate',
  category: 'data',
  keywords: ['chart', 'covariate', 'correlation', 'regression', 'trend', 'statistics', 'corrélation', 'régression'],
  gesture: 'The trend line draws itself through the points.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(stroke('M27 25V69H71', 'main', 5)),
    inset(circle(38, 60, 4.5, 'main'), circle(45, 45, 4.5, 'main'), circle(57, 52, 4.5, 'main'), circle(63, 35, 4.5, 'main')),
    part('trend', plain(stroke('M33 61L69 31', 'accent', 6))),
  ],
  motion: {
    trend: draw({ duration: 600 }),
  },
});
