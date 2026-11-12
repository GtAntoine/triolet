import { circle, icon, inset, part, raised, stroke, swing } from '@triolet/core';

export default icon({
  name: 'key',
  category: 'security',
  keywords: ['key', 'password', 'access', 'unlock', 'login', 'secret', 'clé', 'accès'],
  gesture: 'The key turns in the lock and comes back.',
  draw: [
    part(
      'key',
      raised(stroke('M44 48H80M67 48V61M79 48V58', 'main', 8)),
      raised(circle(30, 48, 19, 'main')),
      inset(circle(30, 48, 8, 'accent')),
    ),
  ],
  motion: {
    key: swing({ angles: [-22, 6], at: [0.4, 0.75], pivot: [30, 48], duration: 700 }),
  },
});
