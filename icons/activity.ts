import { circle, draw, icon, part, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'activity',
  category: 'health',
  keywords: ['activity', 'pulse', 'heartbeat', 'monitor', 'health', 'vital', 'activité', 'pouls'],
  gesture: 'The pulse draws itself, then its dot beats.',
  draw: [
    raised(rect(12, 20, 72, 56, 12, 'base')),
    part('pulse', raised.small(stroke('M21 48H31L38 32L48 64L56 42L60 48H70', 'main', 6))),
    part('dot', raised.small(circle(73, 48, 5.5, 'accent'))),
  ],
  motion: {
    pulse: draw({ duration: 600 }),
    dot: pop({ delay: 600, duration: 400 }),
  },
});
