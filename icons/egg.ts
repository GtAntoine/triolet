import { icon, inset, part, path, pill, raised, swing } from '@triolet/core';

export default icon({
  name: 'egg',
  category: 'social',
  keywords: ['egg', 'breakfast', 'food', 'boiled', 'cook', 'easter', 'œuf', 'petit-déjeuner'],
  gesture: 'The egg wobbles in its cup.',
  draw: [
    part('egg', raised(path('M48 10C61 10 71 30 71 46A23 23 0 0 1 25 46C25 30 35 10 48 10Z', 'base'))),
    // The cup, its band (the accent) and its foot.
    raised(path('M24 52H72V56A24 24 0 0 1 24 56Z', 'main', { outline: 2 }), pill(36, 80, 24, 6, 'main')),
    inset(pill(32, 58, 32, 6, 'accent')),
  ],
  motion: {
    egg: swing({ angles: [7, -6, 4, -2], duration: 800, pivot: 'bottom' }),
  },
});
