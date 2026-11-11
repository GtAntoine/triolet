import { bounce, circle, icon, part, raised, stroke } from '@triolet/core';

export default icon({
  name: 'music',
  category: 'media',
  keywords: ['music', 'note', 'song', 'audio', 'melody', 'sound', 'musique', 'chanson'],
  gesture: 'The note jumps to the beat.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part('note', raised.small(stroke('M41 61V32L63 27V56', 'main', 6), circle(34, 61, 8, 'main'), circle(56, 56, 8, 'accent'))),
  ],
  motion: {
    note: bounce({ height: 7, duration: 650 }),
  },
});
