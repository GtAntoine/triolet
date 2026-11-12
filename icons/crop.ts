import { icon, inset, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'crop',
  category: 'design',
  keywords: ['crop', 'trim', 'cut', 'frame', 'resize', 'image', 'recadrer', 'rogner'],
  gesture: 'The two corners of the crop tool close on the part that is kept.',
  draw: [
    raised(rect(16, 16, 64, 64, 14, 'base')),
    // What is kept.
    inset(rect(41, 41, 14, 14, 3, 'accent')),
    part('corner-a', raised.small(stroke('M34 24V56A6 6 0 0 0 40 62H72', 'main', 6))),
    part('corner-b', raised.small(stroke('M24 34H56A6 6 0 0 1 62 40V72', 'main', 6))),
  ],
  motion: {
    'corner-a': nudge({ x: 3, y: -3, duration: 600 }),
    'corner-b': nudge({ x: -3, y: 3, duration: 600 }),
  },
});
