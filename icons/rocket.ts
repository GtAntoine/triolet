import { circle, icon, inset, nudge, part, path, raised, tracks } from '@triolet/core';

export default icon({
  name: 'rocket',
  category: 'work',
  keywords: ['rocket', 'launch', 'startup', 'fast', 'boost', 'release', 'fusée', 'lancement'],
  gesture: 'The rocket lifts off and its flame flickers.',
  draw: [
    part(
      'rocket',
      part('flame', raised.small(path('M40 64H56C56 74 52 82 48 87C44 82 40 74 40 64Z', 'accent'))),
      raised.small(path('M33 46L20 61V72L33 66Z', 'main', { outline: 3 }), path('M63 46L76 61V72L63 66Z', 'main', { outline: 3 })),
      raised(path('M48 9C60 19 64 35 64 51V66H32V51C32 35 36 19 48 9Z', 'base')),
      inset(circle(48, 37, 7.5, 'main')),
    ),
  ],
  motion: {
    rocket: nudge({ y: -6, settle: true, duration: 700 }),
    flame: tracks({ duration: 700, pivot: 'top' }, { scaleY: [[0.25, 1.3], [0.5, 0.8], [0.75, 1.2]] }),
  },
});
