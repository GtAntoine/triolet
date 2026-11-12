import { blink, circle, icon, inset, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'train',
  category: 'places',
  keywords: ['train', 'rail', 'metro', 'subway', 'station', 'transport', 'tgv', 'gare'],
  gesture: 'The two headlights flash.',
  draw: [
    raised.small(stroke('M33 72L25 86', 'main', 6.5), stroke('M63 72L71 86', 'main', 6.5)),
    raised(rect(20, 10, 56, 64, 15, 'base')),
    inset(rect(28, 19, 40, 24, 7, 'main')),
    inset(pill(40, 52, 16, 6, 'mid')),
    part('lights', inset(circle(33, 59, 6, 'accent'), circle(63, 59, 6, 'accent'))),
  ],
  motion: {
    lights: blink({ to: 0.2, duration: 400, iterations: 2 }),
  },
});
