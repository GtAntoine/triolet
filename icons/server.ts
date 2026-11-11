import { blink, circle, icon, inset, part, pill, raised, rect, stagger } from '@triolet/core';

export default icon({
  name: 'server',
  category: 'devices',
  keywords: ['server', 'hosting', 'rack', 'datacenter', 'backend', 'infrastructure', 'serveur', 'hébergement'],
  gesture: 'The lights of the two racks blink in turn.',
  draw: [
    [16, 52].flatMap((y, k) => [
      raised(rect(14, y, 68, 28, 9, 'base')),
      inset(pill(24, y + 10, 28, 8, 'main')),
      part(`light-${k + 1}`, inset(circle(68, y + 14, 5, 'accent'))),
    ]),
  ],
  motion: {
    ...stagger(['light-1', 'light-2'], blink({ to: 0.15, duration: 350 }), 180),
  },
});
