import { circle, icon, nudge, part, path, raised } from '@triolet/core';

export default icon({
  name: 'arrow-big-right',
  category: 'arrows',
  keywords: ['arrow', 'big', 'right', 'block', 'bold', 'direction', 'flèche', 'droite'],
  gesture: 'The big arrow pushes right and comes back.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part(
      'arrow',
      raised.small(path('M48 24L67 46H56V54H40V46H29Z', 'main', { outline: 3, rotate: [90, 48, 48] })),
      raised.small(path('M40 55H56V63A4 4 0 0 1 52 67H44A4 4 0 0 1 40 63Z', 'accent', { outline: 3, rotate: [90, 48, 48] })),
    ),
  ],
  motion: {
    arrow: nudge({ x: 6, settle: true, duration: 500 }),
  },
});
