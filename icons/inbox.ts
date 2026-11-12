import { circle, icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'inbox',
  category: 'communication',
  keywords: ['inbox', 'messages', 'mail', 'received', 'tray', 'incoming', 'boîte de réception', 'courrier'],
  gesture: 'A letter drops into the tray.',
  draw: [
    part('letter', raised.small(rect(29, 14, 38, 28, 6, 'main')), inset(pill(36, 22, 16, 5, 'base')), inset(circle(58, 33, 4, 'accent'))),
    raised(path('M12 50H30L35 60H61L66 50H84V74A10 10 0 0 1 74 84H22A10 10 0 0 1 12 74Z', 'base')),
    inset(pill(30, 69, 36, 6, 'mid')),
  ],
  motion: {
    letter: nudge({ y: 8, settle: true, duration: 600 }),
  },
});
