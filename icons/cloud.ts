import { circle, icon, nudge, part, pop, raised, rect } from '@triolet/core';

const cloud = (x: number, y: number, k: number, role: 'base' | 'main') => [
  circle(x - 16 * k, y + 2 * k, 14 * k, role),
  circle(x + 2 * k, y - 8 * k, 19 * k, role),
  circle(x + 20 * k, y + 4 * k, 12 * k, role),
  rect(x - 16 * k, y + 2 * k, 36 * k, 14 * k, 7 * k, role),
];

export default icon({
  name: 'cloud',
  category: 'weather',
  keywords: ['cloud', 'weather', 'sky', 'storage', 'online', 'sync', 'nuage', 'météo'],
  gesture: 'The sun comes out and the cloud drifts.',
  draw: [
    part('sun', raised.small(circle(70, 30, 11, 'accent'))),
    raised(cloud(60, 46, 0.72, 'main')),
    part('front', raised(cloud(42, 58, 1.05, 'base'))),
  ],
  motion: {
    sun: pop({ scale: 1.2, duration: 500 }),
    front: nudge({ x: 5, duration: 800, ease: 'inOut' }),
  },
});
