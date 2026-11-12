import { circle, icon, nudge, part, path, pill, raised } from '@triolet/core';

export default icon({
  name: 'arrow-big-up-dash',
  category: 'arrows',
  keywords: ['arrow', 'big', 'up', 'dash', 'block', 'direction', 'flèche', 'monter'],
  gesture: 'The big arrow leaves its dash behind, then comes back to it.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part('arrow', raised.small(path('M48 22L67 44H56V52H40V44H29Z', 'main', { outline: 3 }))),
    raised.small(pill(36.5, 59, 23, 10, 'accent')),
  ],
  motion: {
    arrow: nudge({ y: -6, settle: true, duration: 500 }),
  },
});
