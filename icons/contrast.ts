import { circle, icon, inset, part, path, raised, spin } from '@triolet/core';

export default icon({
  name: 'contrast',
  category: 'design',
  keywords: ['contrast', 'theme', 'dark', 'light', 'brightness', 'mode', 'contraste', 'thème'],
  gesture: 'The disc turns: light and dark swap sides, and come back.',
  draw: [
    part(
      'disc',
      // One disc in two halves.
      raised(circle(48, 48, 35, 'base'), path('M48 13A35 35 0 0 1 48 83Z', 'main')),
      inset(circle(31, 48, 7, 'accent')),
    ),
  ],
  motion: {
    disc: spin({ turns: 1, duration: 900, ease: 'inOut' }),
  },
});
