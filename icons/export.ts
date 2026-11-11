import { icon, inset, nudge, part, path, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'export',
  category: 'data',
  keywords: ['export', 'download', 'upload', 'share', 'outbox', 'tray', 'sortie', 'exporter'],
  gesture: 'The sheet comes out of the tray and the arrow goes up.',
  draw: [
    part('sheet', raised(rect(30, 12, 36, 46, 6, 'base')), inset(pill(37, 21, 22, 5, 'mid')), inset(pill(37, 30, 16, 5, 'mid'))),
    raised(path('M12 50H30L35 60H61L66 50H84V74A10 10 0 0 1 74 84H22A10 10 0 0 1 12 74Z', 'main')),
    part('arrow', raised.small(stroke('M78 40V14M70 22L78 14L86 22', 'accent', 5))),
  ],
  motion: {
    sheet: nudge({ y: -6, settle: true, duration: 600 }),
    arrow: nudge({ y: -6, settle: true, duration: 500, delay: 120 }),
  },
});
