import { circle, icon, part, pop, raised, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'share',
  category: 'interface',
  keywords: ['share', 'network', 'send', 'social', 'connect', 'spread', 'partager', 'diffuser'],
  gesture: 'The three points light up one after the other.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised.small(stroke('M26 48L68 24M26 48L68 72', 'mid', 7)),
    part('node-1', raised(circle(26, 48, 12, 'main'))),
    part('node-2', raised(circle(68, 24, 12, 'main'))),
    part('node-3', raised(circle(68, 72, 9.5, 'accent'))),
  ],
  motion: {
    ...stagger(['node-1', 'node-2', 'node-3'], pop({ scale: 1.25, duration: 400 }), 130),
  },
});
