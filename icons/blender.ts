import { circle, icon, inset, part, path, pill, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'blender',
  category: 'social',
  keywords: ['blender', 'mixer', 'kitchen', 'smoothie', 'juice', 'cook', 'mixeur', 'cuisine'],
  gesture: 'The jar shakes as it blends.',
  draw: [
    part(
      'jar',
      raised.small(pill(30, 8, 36, 9, 'main')),
      raised(path('M28 16H68L63 58H33Z', 'base', { outline: 3 })),
      // What is being blended: the accent.
      inset(path('M33 40H63L61.5 54H34.5Z', 'accent')),
    ),
    // The base and its button.
    raised(rect(24, 60, 48, 24, 8, 'main')),
    inset(circle(48, 72, 5, 'base')),
  ],
  motion: {
    jar: swing({ angles: [3, -3, 3, -3, 2], duration: 600, pivot: 'bottom' }),
  },
});
