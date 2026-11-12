import { circle, icon, inset, part, path, pill, raised, rect, swing } from '@triolet/core';

export default icon({
  name: 'thumbs-up',
  aliases: ['like'],
  category: 'social',
  keywords: ['thumbs up', 'like', 'approve', 'good', 'agree', 'yes', 'pouce', 'approuver'],
  gesture: 'The thumb goes up.',
  draw: [
    part(
      'hand',
      raised(rect(14, 42, 17, 40, 6, 'main')),
      raised(rect(34, 40, 44, 42, 11, 'base'), path('M38 46L47 20A7.5 7.5 0 0 1 61 24L57 46Z', 'base')),
      inset(pill(54, 52, 16, 5, 'mid')),
      inset(pill(54, 62, 16, 5, 'mid')),
      inset(circle(22, 72, 4, 'accent')),
    ),
  ],
  motion: {
    hand: swing({ angles: [-12, 5], at: [0.4, 0.75], pivot: 'bottom-left', duration: 600, ease: 'out' }),
  },
});
