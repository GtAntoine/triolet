import { icon, inset, part, path, pill, raised, reveal, swing } from '@triolet/core';

export default icon({
  name: 'hourglass',
  category: 'time',
  keywords: ['hourglass', 'wait', 'loading', 'time', 'pending', 'timer', 'sablier', 'attente'],
  gesture: 'The hourglass rocks and the sand piles up.',
  draw: [
    part(
      'glass',
      raised(path('M28 16H68V30C68 40 56 44 56 48C56 52 68 56 68 66V80H28V66C28 56 40 52 40 48C40 44 28 40 28 30Z', 'base')),
      inset(path('M36 24H60V30C60 35 52 39 48 42C44 39 36 35 36 30Z', 'mid')),
      part('sand', inset(path('M36 74C36 67 44 64 48 61C52 64 60 67 60 74Z', 'accent'))),
      raised.small(pill(22, 10, 52, 9, 'main'), pill(22, 77, 52, 9, 'main')),
    ),
  ],
  motion: {
    glass: swing({ angles: [10, -7, 3], duration: 800 }),
    sand: reveal({ from: 'bottom', amount: 0.3, duration: 700, delay: 200 }),
  },
});
