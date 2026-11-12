import { circle, icon, inset, nudge, part, path, raised } from '@triolet/core';

export default icon({
  name: 'chart-pie',
  category: 'data',
  keywords: ['chart', 'pie chart', 'share', 'proportion', 'statistics', 'analytics', 'camembert', 'répartition'],
  gesture: 'One slice of the pie pulls out.',
  draw: [
    raised(circle(46, 50, 33, 'base')),
    inset(path('M46 50H13A33 33 0 0 0 46 83Z', 'main')),
    part('slice', raised.small(path('M51 45V18A27 27 0 0 1 78 45Z', 'accent'))),
  ],
  motion: {
    slice: nudge({ x: 4, y: -4, duration: 600 }),
  },
});
