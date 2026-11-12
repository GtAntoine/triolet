import { circle, icon, nudge, part, path, pill, raised } from '@triolet/core';

export default icon({
  name: 'eject',
  category: 'media',
  keywords: ['eject', 'remove', 'disc', 'unmount', 'release', 'out', 'éjecter', 'retirer'],
  gesture: 'The triangle jumps up, as something is ejected.',
  draw: [
    raised(circle(48, 48, 35, 'base')),
    part('triangle', raised.small(path('M48 27L65 50H31Z', 'main', { outline: 5 }))),
    raised.small(pill(29, 60, 38, 9, 'accent')),
  ],
  motion: {
    triangle: nudge({ y: -6, settle: true, duration: 500 }),
  },
});
