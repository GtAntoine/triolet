import { circle, icon, inset, part, pill, raised, swing } from '@triolet/core';

export default icon({
  name: 'earbuds',
  aliases: ['device-airpods', 'airpods'],
  category: 'devices',
  keywords: ['earbuds', 'earphones', 'wireless', 'audio', 'music', 'listen', 'écouteurs', 'sans fil'],
  gesture: 'The two earbuds tilt towards each other.',
  draw: [
    part('left', raised(circle(31, 30, 15, 'base'), pill(31, 32, 12, 50, 'base')), inset(circle(27, 30, 7, 'main')), inset(pill(33.5, 62, 7, 15, 'accent'))),
    part('right', raised(circle(65, 30, 15, 'base'), pill(53, 32, 12, 50, 'base')), inset(circle(69, 30, 7, 'main')), inset(pill(55.5, 62, 7, 15, 'accent'))),
  ],
  motion: {
    left: swing({ angles: [8, -4, 0], duration: 700, pivot: [31, 30] }),
    right: swing({ angles: [-8, 4, 0], duration: 700, pivot: [65, 30] }),
  },
});
