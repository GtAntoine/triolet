import { blink, circle, icon, inset, part, pill, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'router',
  category: 'devices',
  keywords: ['router', 'wifi', 'network', 'internet', 'modem', 'box', 'routeur', 'réseau'],
  gesture: 'The signal leaves the router, wave after wave.',
  draw: [
    raised.small(stroke('M24 52V32', 'main', 6.5), stroke('M72 52V32', 'main', 6.5)),
    raised.small(pill(20, 76, 12, 7, 'main'), pill(64, 76, 12, 7, 'main')),
    raised(rect(10, 50, 76, 28, 10, 'base')),
    inset(circle(25, 64, 4.5, 'main'), circle(38, 64, 4.5, 'main'), pill(52, 60.5, 24, 7, 'mid')),
    raised.small(circle(48, 40, 4.5, 'accent')),
    part('wave-1', raised.small(stroke('M39 31A12 12 0 0 1 57 31', 'accent', 5.5))),
    part('wave-2', raised.small(stroke('M32 22A22 22 0 0 1 64 22', 'accent', 5.5))),
  ],
  motion: {
    ...stagger(['wave-1', 'wave-2'], blink({ to: 0.1, duration: 500 }), 160),
  },
});
