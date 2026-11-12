import { blink, icon, part, path, pill, raised, rect, stagger, stroke, resize } from '@triolet/core';

export default icon({
  name: 'megaphone',
  category: 'communication',
  keywords: ['megaphone', 'announce', 'broadcast', 'marketing', 'campaign', 'loud', 'mégaphone', 'annonce'],
  gesture: 'The two sound waves leave the megaphone.',
  draw: resize(
    [
    raised.small(rect(24, 54, 11, 26, 4, 'main')),
    raised(rect(8, 36, 16, 24, 6, 'main')),
    raised(path('M20 38L58 20V76L20 58Z', 'base', { outline: 4 })),
    raised.small(pill(54, 14, 12, 68, 'main')),
    part('wave-1', raised.small(stroke('M74 38A14 14 0 0 1 74 58', 'accent', 6))),
    part('wave-2', raised.small(stroke('M82 28A26 26 0 0 1 82 68', 'accent', 6))),
    ],
    0.9,
  ),
  motion: {
    ...stagger(['wave-1', 'wave-2'], blink({ to: 0.1, duration: 500 }), 160),
  },
});
