import { icon, inset, part, pill, pop, raised, rect, stagger } from '@triolet/core';

export default icon({
  name: 'tablet',
  category: 'devices',
  keywords: ['tablet', 'ipad', 'device', 'screen', 'apps', 'touch', 'tablette', 'écran'],
  gesture: 'The four apps pop on the screen, one after the other.',
  draw: [
    raised(rect(18, 12, 60, 72, 11, 'main')),
    inset(rect(24, 18, 48, 54, 6, 'base')),
    part('app-1', inset(rect(30, 24, 15, 15, 4, 'accent'))),
    part('app-2', inset(rect(51, 24, 15, 15, 4, 'mid'))),
    part('app-3', inset(rect(30, 45, 15, 15, 4, 'mid'))),
    part('app-4', inset(rect(51, 45, 15, 15, 4, 'mid'))),
    inset(pill(42, 76, 12, 4, 'mainLight')),
  ],
  motion: {
    ...stagger(['app-1', 'app-2', 'app-3', 'app-4'], pop({ scale: 1.2, duration: 400 }), 90),
  },
});
