import { circle, clip, icon, inset, part, path, pill, plain, raised, rect, reveal, stagger, travel } from '@triolet/core';

export default icon({
  name: 'newspaper',
  aliases: ['actualites'],
  category: 'communication',
  keywords: ['news', 'newspaper', 'article', 'press', 'feed', 'blog', 'actualités', 'journal'],
  gesture: 'The sun rises in the picture and the lines write themselves.',
  draw: [
    raised(rect(12, 18, 72, 60, 10, 'base')),
    inset(rect(20, 26, 30, 27, 4, 'main')),
    // The sun is cut by the frame of the picture while it rises.
    clip(rect(20, 26, 30, 27, 4, 'main'), part('sun', plain(circle(42, 33, 4, 'accent')))),
    plain(path('M21 52L31 40L37.5 46.5L42 42L49 52Z', 'base')),
    [27, 36.5, 46].map((y, k) => part(`line-${k + 1}`, inset(pill(56, y, 20, 5.5, 'mid')))),
    part('line-4', inset(pill(20, 62, 56, 6, 'mid'))),
  ],
  motion: {
    sun: travel({ from: [0, 11], duration: 700 }),
    ...stagger(['line-1', 'line-2', 'line-3', 'line-4'], reveal({ duration: 400 }), 70),
  },
});
