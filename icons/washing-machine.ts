import { circle, icon, inset, part, path, pill, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'washing-machine',
  category: 'places',
  keywords: ['washing machine', 'laundry', 'clean', 'clothes', 'appliance', 'home', 'machine à laver', 'lessive'],
  gesture: 'The water sloshes behind the door.',
  draw: [
    raised(rect(18, 10, 60, 76, 11, 'base')),
    inset(pill(26, 17, 20, 6, 'mid'), circle(66, 20, 4, 'main')),
    inset(circle(48, 54, 21, 'main')),
    inset(circle(48, 54, 14, 'soft')),
    // The water: the accent.
    part('water', inset(path('M34 56A14 14 0 0 0 62 56Z', 'accent'))),
  ],
  motion: {
    water: swing({ angles: [18, -14, 8, -4], duration: 900, pivot: [48, 54] }),
  },
});
