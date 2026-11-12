import { circle, clip, draw, icon, inset, part, path, plain, raised, rect, stroke } from '@triolet/core';

const body = 'M48 20C36 20 30 30 30 42V56L22 66V71H74V66L66 56V42C66 30 60 20 48 20Z';

export default icon({
  name: 'bell-off',
  category: 'notifications',
  keywords: ['bell', 'mute', 'silent', 'notifications off', 'quiet', 'do not disturb', 'silencieux', 'muet'],
  gesture: 'The bar crosses out the bell.',
  draw: [
    raised(circle(48, 17, 4.5, 'main'), circle(48, 75, 8.5, 'accent')),
    raised(path(body, 'base', { outline: 3 })),
    clip(path(body, 'base'), inset(rect(16, 58, 64, 8, 0, 'main'))),
    part('bar', plain(stroke('M20 80L76 16', 'gap', 13)), raised.small(stroke('M20 80L76 16', 'main', 7))),
  ],
  motion: {
    bar: draw({ duration: 450 }),
  },
});
