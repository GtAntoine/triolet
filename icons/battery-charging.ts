import { blink, icon, inset, part, path, raised, rect } from '@triolet/core';

export default icon({
  name: 'battery-charging',
  category: 'devices',
  keywords: ['battery', 'charging', 'charge', 'power', 'plugged', 'energy', 'recharge', 'batterie'],
  gesture: 'The bolt flashes: the battery is charging.',
  draw: [
    raised.small(rect(76, 40, 10, 16, 4, 'main')),
    raised(rect(10, 28, 68, 40, 10, 'base')),
    inset(rect(17, 35, 54, 26, 5, 'soft')),
    inset(rect(17, 35, 20, 26, 5, 'main')),
    part('bolt', raised.small(path('M50 32L38 50H47L44 64L58 45H49Z', 'accent', { outline: 2.5 }))),
  ],
  motion: {
    bolt: blink({ to: 0.2, duration: 450, iterations: 2 }),
  },
});
