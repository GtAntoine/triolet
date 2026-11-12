import { icon, inset, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'login',
  category: 'interface',
  keywords: ['login', 'sign in', 'enter', 'access', 'door', 'account', 'connexion', 'entrer'],
  gesture: 'The arrow goes through the door.',
  draw: [
    raised(rect(46, 14, 36, 68, 11, 'main')),
    inset(rect(53, 21, 22, 54, 6, 'base')),
    part('arrow', raised.small(stroke('M14 48H50M38 35L51 48L38 61', 'accent', 6))),
  ],
  motion: {
    arrow: nudge({ x: 7, settle: true, duration: 520 }),
  },
});
