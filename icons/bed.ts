import { icon, part, pop, raised, rect, resize, stroke } from '@triolet/core';

export default icon({
  name: 'bed',
  category: 'places',
  keywords: ['bed', 'sleep', 'hotel', 'room', 'rest', 'night', 'lit', 'dormir'],
  gesture: 'The pillow is plumped up.',
  draw: resize(
    [
      raised.small(stroke('M18 68V78M78 68V78', 'main', 6)),
      raised(rect(10, 26, 11, 44, 5, 'main')),
      raised(rect(14, 52, 72, 18, 7, 'base')),
      raised.small(rect(48, 44, 38, 16, 7, 'main')),
      part('pillow', raised.small(rect(24, 42, 22, 13, 6, 'accent'))),
    ],
    1,
    { move: [0, -5] },
  ),
  motion: {
    pillow: pop({ scale: 1.2, duration: 500 }),
  },
});
