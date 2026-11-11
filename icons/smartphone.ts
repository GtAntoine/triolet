import { icon, inset, part, pill, raised, rect, travel } from '@triolet/core';

export default icon({
  name: 'smartphone',
  category: 'devices',
  keywords: ['smartphone', 'phone', 'mobile', 'device', 'app', 'screen', 'téléphone', 'portable'],
  gesture: 'A notification slides down on the screen.',
  draw: [
    raised(rect(26, 10, 44, 76, 11, 'main')),
    inset(rect(31, 17, 34, 56, 6, 'base')),
    part('notification', inset(pill(36, 24, 24, 9, 'accent'))),
    inset(pill(36, 40, 24, 6, 'mid')),
    inset(pill(36, 51, 16, 6, 'mid')),
    inset(pill(42, 77, 12, 4, 'mainLight')),
  ],
  motion: {
    notification: travel({ from: [0, -8], fade: true, duration: 500 }),
  },
});
