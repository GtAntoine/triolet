import { circle, icon, part, raised, spin, stroke } from '@triolet/core';

const arms = [0, 60, 120];

export default icon({
  name: 'snowflake',
  category: 'weather',
  keywords: ['snowflake', 'snow', 'cold', 'winter', 'freeze', 'frost', 'flocon', 'neige'],
  gesture: 'The snowflake turns a sixth of a turn.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'flake',
      raised.small(arms.map((a) => stroke('M48 22V74M41 27L48 33L55 27M41 69L48 63L55 69', 'main', 5, { rotate: [a, 48, 48] }))),
      raised.small(circle(48, 48, 5.5, 'accent')),
    ),
  ],
  motion: {
    flake: spin({ from: -60, duration: 800, ease: 'out', pivot: [48, 48] }),
  },
});
