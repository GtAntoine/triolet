import { circle, icon, inset, part, raised, spin } from '@triolet/core';

const dots = [0, 45, 90, 135, 180, 225, 270, 315];

export default icon({
  name: 'brightness-down',
  category: 'settings',
  keywords: ['brightness', 'dim', 'down', 'light', 'screen', 'low', 'luminosité', 'baisser'],
  gesture: 'The dots turn around the dimmed sun.',
  draw: [
    part('dots', raised.small(dots.map((a) => circle(48, 18, 4.5, 'main', { rotate: [a, 48, 48] })))),
    raised(circle(48, 48, 19, 'base')),
    inset(circle(48, 48, 9, 'accent')),
  ],
  motion: {
    dots: spin({ from: -45, duration: 700, ease: 'out', pivot: [48, 48] }),
  },
});
