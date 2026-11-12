import { circle, icon, inset, part, raised, spin, stroke } from '@triolet/core';

const ORBIT = 'M19 48A29 11 0 1 0 77 48A29 11 0 1 0 19 48Z';

export default icon({
  name: 'atom',
  category: 'education',
  keywords: ['atom', 'science', 'physics', 'chemistry', 'nucleus', 'molecule', 'atome', 'physique'],
  gesture: 'The three orbits make one turn around the nucleus.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    part(
      'orbits',
      inset(stroke(ORBIT, 'main', 4), stroke(ORBIT, 'main', 4, { rotate: [60, 48, 48] }), stroke(ORBIT, 'main', 4, { rotate: [120, 48, 48] })),
    ),
    raised.small(circle(48, 48, 7, 'accent')),
  ],
  motion: {
    orbits: spin({ turns: 1, duration: 1200, ease: 'inOut' }),
  },
});
