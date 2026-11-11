import { bounce, circle, icon, inset, part, path, plain, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'signalement',
  category: 'places',
  keywords: ['report', 'pin', 'location', 'issue', 'alert', 'map', 'signalement', 'repère', 'lieu'],
  gesture: 'The pin plants itself and the alert badge lights up.',
  draw: [
    part('pin', raised(path('M44 86C38 78 20 60 20 41A24 24 0 0 1 68 41C68 60 50 78 44 86Z', 'main')), inset(circle(44, 41, 9.5, 'base'))),
    part(
      'badge',
      plain(circle(69, 21, 16, 'gap')),
      raised.small(circle(69, 21, 13, 'accent')),
      plain(rect(67.3, 12.5, 3.4, 10.5, 1.7, 'on'), circle(69, 27.8, 2, 'on')),
    ),
  ],
  motion: {
    pin: bounce({ duration: 700 }),
    badge: pop({ duration: 450, delay: 200 }),
  },
});
