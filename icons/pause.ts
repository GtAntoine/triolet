import { circle, icon, inset, part, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'pause',
  category: 'media',
  keywords: ['pause', 'stop', 'hold', 'wait', 'break', 'media', 'suspendre', 'arrêt'],
  gesture: 'The two bars rise one after the other.',
  draw: [
    raised(circle(48, 48, 35, 'main')),
    inset(circle(48, 48, 29, 'base')),
    part('bar-1', raised.small(rect(36, 34, 9, 28, 4.5, 'accent'))),
    part('bar-2', raised.small(rect(51, 34, 9, 28, 4.5, 'accent'))),
  ],
  motion: {
    ...stagger(['bar-1', 'bar-2'], reveal({ from: 'bottom', duration: 450 }), 120),
  },
});
