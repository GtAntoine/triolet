import { circle, icon, inset, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'lock',
  category: 'security',
  keywords: ['lock', 'padlock', 'secure', 'password', 'private', 'protected', 'cadenas', 'verrou'],
  gesture: 'The shackle lifts and locks back.',
  draw: [
    part('shackle', raised(stroke('M33 46V32A15 15 0 0 1 63 32V46', 'base', 8))),
    raised(rect(20, 42, 56, 42, 10, 'main')),
    inset(circle(48, 58, 6, 'accent'), rect(45, 60, 6, 13, 3, 'accent')),
  ],
  motion: {
    shackle: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
