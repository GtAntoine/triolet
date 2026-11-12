import { bounce, icon, part, path, pill, raised, rect, resize } from '@triolet/core';
import { HEART } from './_shared.ts';

export default icon({
  name: 'hand-heart',
  category: 'social',
  keywords: ['hand', 'heart', 'care', 'donate', 'charity', 'support', 'don', 'solidarité'],
  gesture: 'The heart bounces in the open hand.',
  draw: [
    part('heart', ...resize([raised.small(path(HEART, 'accent'))], 0.62, { about: [48, 23], move: [2, 14] })),
    // The sleeve, then the open hand: palm and thumb.
    raised.small(rect(8, 54, 14, 30, 5, 'main')),
    raised(pill(18, 62, 60, 18, 'base'), pill(34, 52, 50, 14, 'base')),
  ],
  motion: {
    heart: bounce({ height: 7 }),
  },
});
