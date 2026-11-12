import { icon, inset, part, pill, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'elevator',
  category: 'places',
  keywords: ['elevator', 'lift', 'floor', 'building', 'access', 'doors', 'ascenseur', 'étage'],
  gesture: 'The two doors open, then close.',
  draw: [
    raised(rect(18, 12, 60, 72, 10, 'base')),
    // The floor indicator is the accent.
    inset(pill(38, 19, 20, 6, 'accent')),
    inset(rect(26, 32, 44, 44, 3, 'soft')),
    part('door-left', inset(rect(26, 32, 21, 44, 3, 'main'))),
    part('door-right', inset(rect(49, 32, 21, 44, 3, 'main'))),
  ],
  motion: {
    'door-left': tracks({ duration: 1000, ease: 'inOut', pivot: 'left' }, { scaleX: [[0.3, 0.25], [0.65, 0.25]] }),
    'door-right': tracks({ duration: 1000, ease: 'inOut', pivot: 'right' }, { scaleX: [[0.3, 0.25], [0.65, 0.25]] }),
  },
});
