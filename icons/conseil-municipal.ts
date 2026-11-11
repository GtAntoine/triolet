import { icon, inset, part, path, pill, raised, rect, wave } from '@triolet/core';

export default icon({
  name: 'conseil-municipal',
  category: 'civic',
  keywords: ['town hall', 'city hall', 'council', 'government', 'institution', 'building', 'mairie', 'conseil'],
  gesture: 'The flag ripples on top of the town hall.',
  draw: [
    raised.small(rect(43, 7, 3, 20, 1.5, 'main')),
    part(
      'flag',
      raised.small(path('M46 7H52V19H46Z', 'main'), path('M52 7H58V19H52Z', 'base'), path('M58 7H62A2 2 0 0 1 64 9V17A2 2 0 0 1 62 19H58Z', 'accent')),
    ),
    raised(rect(19, 40, 58, 38, 3, 'base')),
    [27, 44, 61].map((x) => inset(pill(x, 47, 8, 24, 'main'))),
    raised(path('M15 40L48 24L81 40Z', 'main', { outline: 5 })),
    raised(pill(13, 76, 70, 9, 'main')),
  ],
  motion: {
    flag: wave(),
  },
});
