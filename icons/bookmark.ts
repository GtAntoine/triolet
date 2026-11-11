import { icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'bookmark',
  category: 'interface',
  keywords: ['bookmark', 'save', 'keep', 'read later', 'favourite', 'ribbon', 'signet', 'marque-page'],
  gesture: 'The ribbon slides down to mark the page.',
  draw: [
    raised(rect(18, 16, 60, 68, 9, 'base')),
    inset(pill(28, 34, 22, 7, 'main')),
    inset(pill(28, 48, 34, 7, 'main')),
    inset(pill(28, 62, 26, 7, 'main')),
    part('ribbon', raised.small(path('M56 10H70V42L63 36L56 42Z', 'accent'))),
  ],
  motion: {
    ribbon: nudge({ y: 6, at: 0.45, duration: 550 }),
  },
});
