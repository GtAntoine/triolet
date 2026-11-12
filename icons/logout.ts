import { icon, inset, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'logout',
  category: 'interface',
  keywords: ['logout', 'sign out', 'exit', 'leave', 'door', 'account', 'déconnexion', 'quitter'],
  gesture: 'The arrow leaves through the door.',
  draw: [
    raised(rect(14, 14, 36, 68, 11, 'main')),
    inset(rect(21, 21, 22, 54, 6, 'base')),
    part('arrow', raised.small(stroke('M40 48H82M70 35L83 48L70 61', 'accent', 6))),
  ],
  motion: {
    arrow: nudge({ x: 7, settle: true, duration: 520 }),
  },
});
