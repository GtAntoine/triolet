import { circle, icon, inset, part, path, pop, raised } from '@triolet/core';

export default icon({
  name: 'cheese',
  category: 'social',
  keywords: ['cheese', 'food', 'dairy', 'wedge', 'snack', 'mouse', 'fromage', 'gruyère'],
  gesture: 'One hole of the cheese pops.',
  draw: [
    // The top of the wedge, then its side.
    raised(path('M12 46L68 21A11 11 0 0 1 84 31V46Z', 'main', { outline: 2 })),
    raised(path('M12 46H84V70A8 8 0 0 1 76 78H20A8 8 0 0 1 12 70Z', 'base')),
    inset(circle(29, 62, 7, 'mid'), circle(69, 65, 6, 'mid')),
    part('hole', inset(circle(50, 59, 6, 'accent'))),
  ],
  motion: {
    hole: pop({ scale: 1.4 }),
  },
});
