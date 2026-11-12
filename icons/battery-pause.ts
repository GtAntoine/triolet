import { blink, icon, inset, part, raised, rect } from '@triolet/core';

export default icon({
  name: 'battery-pause',
  category: 'devices',
  keywords: ['battery', 'pause', 'paused', 'charging', 'hold', 'power', 'batterie', 'en pause'],
  gesture: 'The two bars blink: charging is paused.',
  draw: [
    raised.small(rect(76, 40, 10, 16, 4, 'main')),
    raised(rect(10, 28, 68, 40, 10, 'base')),
    inset(rect(17, 35, 54, 26, 5, 'soft')),
    inset(rect(17, 35, 14, 26, 5, 'main')),
    part('bars', inset(rect(40, 39, 7, 18, 3, 'accent'), rect(53, 39, 7, 18, 3, 'accent'))),
  ],
  motion: {
    bars: blink({ to: 0.2, duration: 500, iterations: 2 }),
  },
});
