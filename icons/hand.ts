import { circle, icon, inset, part, raised, rect, resize, swing } from '@triolet/core';

export default icon({
  name: 'hand',
  category: 'social',
  keywords: ['hand', 'stop', 'wave', 'hello', 'raise', 'volunteer', 'main', 'bonjour'],
  gesture: 'The hand waves.',
  draw: resize(
    [
      part(
        'hand',
        raised(
          rect(29, 40, 40, 44, 15, 'base'),
          rect(29, 20, 9.5, 36, 4.75, 'base'),
          rect(39.2, 13, 9.5, 40, 4.75, 'base'),
          rect(49.4, 15, 9.5, 38, 4.75, 'base'),
          rect(59.6, 22, 9.5, 34, 4.75, 'base'),
          rect(17, 44, 10, 28, 5, 'base', { rotate: [-32, 22, 66] }),
        ),
        inset(circle(49, 62, 7, 'accent')),
        raised.small(rect(31, 78, 36, 9, 4, 'main')),
      ),
    ],
    1,
    { move: [6, -1] },
  ),
  motion: {
    hand: swing({ angles: [-10, 8, -6, 4], pivot: 'bottom', duration: 800 }),
  },
});
