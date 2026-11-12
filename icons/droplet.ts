import { bounce, icon, inset, part, path, raised, resize } from '@triolet/core';

const DROP = 'M48 10C60 28 74 42 74 58A26 26 0 0 1 22 58C22 42 36 28 48 10Z';

export default icon({
  name: 'droplet',
  category: 'weather',
  keywords: ['droplet', 'water', 'drop', 'rain', 'liquid', 'humidity', 'goutte', 'eau'],
  gesture: 'The drop falls and bounces.',
  draw: [
    part(
      'drop',
      // Three drops, one inside the other.
      raised(path(DROP, 'base')),
      ...resize([inset(path(DROP, 'main'))], 0.62, { about: [48, 62] }),
      ...resize([inset(path(DROP, 'accent'))], 0.3, { about: [48, 66] }),
    ),
  ],
  motion: {
    drop: bounce({ height: 8 }),
  },
});
