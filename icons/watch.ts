import { circle, draw, icon, part, plain, raised, rect, stroke, resize } from '@triolet/core';

export default icon({
  name: 'watch',
  category: 'devices',
  keywords: ['watch', 'smartwatch', 'time', 'wearable', 'wrist', 'fitness', 'montre', 'poignet'],
  gesture: 'The activity ring fills up.',
  draw: resize(
    [
    raised(rect(33, 6, 30, 84, 9, 'main')),
    raised(circle(48, 48, 27, 'base')),
    part('ring', plain(stroke('M48 29A19 19 0 1 1 29 48', 'accent', 5.5))),
    plain(stroke('M48 48V38', 'main', 5), stroke('M48 48L55 52', 'main', 5)),
    ],
    0.93,
  ),
  motion: {
    ring: draw({ duration: 700 }),
  },
});
