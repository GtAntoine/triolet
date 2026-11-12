import { circle, icon, part, raised, ring, stroke, swing } from '@triolet/core';

export default icon({
  name: 'anchor',
  category: 'places',
  keywords: ['anchor', 'port', 'boat', 'sea', 'harbour', 'marine', 'ancre', 'bateau'],
  gesture: 'The anchor swings from its ring.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part('anchor', raised.small(stroke('M48 33V72M37 42H59M27 56A21 21 0 0 0 69 56', 'main', 7)), raised.small(ring(48, 26, 6.5, 'accent', 6))),
  ],
  motion: {
    anchor: swing({ angles: [9, -6, 3], pivot: [48, 26], duration: 800 }),
  },
});
