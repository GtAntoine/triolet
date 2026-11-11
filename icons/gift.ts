import { icon, nudge, part, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'gift',
  category: 'commerce',
  keywords: ['gift', 'present', 'reward', 'surprise', 'birthday', 'offer', 'cadeau', 'récompense'],
  gesture: 'The lid lifts and settles back.',
  draw: [
    raised(rect(18, 40, 60, 44, 8, 'base')),
    raised.small(rect(44, 42, 8, 42, 0, 'accent')),
    part(
      'lid',
      raised.small(stroke('M48 30C41 14 26 20 35 30M48 30C55 14 70 20 61 30', 'accent', 5)),
      raised(rect(12, 28, 72, 17, 7, 'main')),
      raised.small(rect(44, 28, 8, 17, 0, 'accent')),
    ),
  ],
  motion: {
    lid: nudge({ y: -7, settle: true, duration: 600 }),
  },
});
