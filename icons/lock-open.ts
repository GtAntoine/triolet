import { circle, icon, inset, part, raised, rect, stroke, travel } from '@triolet/core';

export default icon({
  name: 'lock-open',
  category: 'security',
  keywords: ['unlock', 'open', 'lock', 'access', 'unlocked', 'free', 'déverrouiller', 'ouvert'],
  gesture: 'The shackle springs open.',
  draw: [
    part('shackle', raised(stroke('M33 46V26A15 15 0 0 1 63 26V30', 'main', 8))),
    raised(rect(20, 42, 56, 42, 10, 'base')),
    inset(circle(48, 58, 7, 'accent'), rect(44.5, 60, 7, 14, 3.5, 'accent')),
  ],
  motion: {
    shackle: travel({ from: [0, 6], duration: 450 }),
  },
});
