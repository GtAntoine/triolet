import { circle, icon, inset, part, raised, spin, stroke } from '@triolet/core';

const rays = [0, 45, 90, 135, 180, 225, 270, 315];

export default icon({
  name: 'sun',
  category: 'weather',
  keywords: ['sun', 'sunny', 'day', 'light', 'weather', 'bright', 'soleil', 'jour'],
  gesture: 'The rays turn around the sun.',
  draw: [
    part('rays', raised.small(rays.map((a) => stroke('M48 14V24', 'main', 7, { rotate: [a, 48, 48] })))),
    raised(circle(48, 48, 19, 'base')),
    inset(circle(48, 48, 10, 'accent')),
  ],
  motion: {
    rays: spin({ from: -45, duration: 800, ease: 'out', pivot: [48, 48] }),
  },
});
