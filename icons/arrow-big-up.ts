import { circle, icon, nudge, part, path, raised } from '@triolet/core';

export default icon({
  name: 'arrow-big-up',
  category: 'arrows',
  keywords: ['arrow', 'big', 'up', 'block', 'bold', 'direction', 'flèche', 'haut'],
  gesture: 'The big arrow pushes up and comes back.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part(
      'arrow',
      raised.small(path('M48 24L67 46H56V54H40V46H29Z', 'main', { outline: 3 })),
      raised.small(path('M40 55H56V63A4 4 0 0 1 52 67H44A4 4 0 0 1 40 63Z', 'accent', { outline: 3 })),
    ),
  ],
  motion: {
    arrow: nudge({ y: -6, settle: true, duration: 500 }),
  },
});
