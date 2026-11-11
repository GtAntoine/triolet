import { circle, icon, nudge, part, pill, raised, rect, reveal, stagger, stroke } from '@triolet/core';

const bars = [
  { x: 18, y: 56, role: 'soft' },
  { x: 40, y: 42, role: 'main' },
  { x: 62, y: 30, role: 'soft' },
] as const;

export default icon({
  name: 'decisions',
  category: 'data',
  keywords: ['chart', 'bar chart', 'trend', 'statistics', 'growth', 'analytics', 'décisions', 'graphique'],
  gesture: 'The bars rise one after the other, then the trend line follows.',
  draw: [
    raised(pill(10, 79, 76, 8, 'main')),
    bars.map((b, k) => part(`bar-${k + 1}`, raised(rect(b.x, b.y, 16, 80 - b.y, 4, b.role)))),
    part(
      'trend',
      raised.small(stroke('M26 42L48 28L70 16', 'accent', 4), circle(26, 42, 4.5, 'accent'), circle(48, 28, 4.5, 'accent'), circle(70, 16, 5.5, 'accent')),
    ),
  ],
  motion: {
    ...stagger(['bar-1', 'bar-2', 'bar-3'], reveal({ from: 'bottom', duration: 500 }), 80),
    trend: nudge({ y: -6, settle: true, duration: 500, delay: 250 }),
  },
});
