import { circle, icon, inset, nudge, part, path, pill, raised, rect, resize } from '@triolet/core';

export default icon({
  name: 'truck',
  category: 'commerce',
  keywords: ['truck', 'delivery', 'shipping', 'transport', 'logistics', 'order', 'camion', 'livraison'],
  gesture: 'The truck drives off and comes back.',
  draw: resize(
    [
      part(
        'truck',
        raised(path('M56 38H69L84 52V64A3 3 0 0 1 81 67H56Z', 'main', { outline: 2 })),
        inset(path('M62 44H68L75 52H62Z', 'soft')),
        raised(rect(10, 26, 48, 41, 7, 'base')),
        inset(pill(18, 36, 24, 8, 'accent')),
        raised.small(circle(28, 70, 8.5, 'main'), circle(68, 70, 8.5, 'main')),
        inset(circle(28, 70, 3, 'base'), circle(68, 70, 3, 'base')),
      ),
    ],
    1,
    { move: [0, -4] },
  ),
  motion: {
    truck: nudge({ x: 6, settle: true, duration: 650 }),
  },
});
