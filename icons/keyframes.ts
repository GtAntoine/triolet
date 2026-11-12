import { icon, part, pop, raised, rect, stagger } from '@triolet/core';

const diamond = (cx: number, size: number, role: 'base' | 'main' | 'accent') =>
  rect(cx - size / 2, 48 - size / 2, size, size, size / 5, role, { rotate: [45, cx, 48] });

export default icon({
  name: 'keyframes',
  category: 'design',
  keywords: ['keyframes', 'animation', 'motion', 'timeline', 'tween', 'frames', 'images clés', 'interpolation'],
  gesture: 'The three keyframes pop along the timeline.',
  draw: [
    part('key-1', raised(diamond(24, 20, 'main'))),
    part('key-3', raised(diamond(73, 18, 'accent'))),
    part('key-2', raised(diamond(48, 32, 'base'))),
  ],
  motion: {
    ...stagger(['key-1', 'key-2', 'key-3'], pop({ scale: 1.15, duration: 380 }), 120),
  },
});
