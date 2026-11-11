import { icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'notebook',
  aliases: ['memoire'],
  category: 'documents',
  keywords: ['notebook', 'memory', 'bookmark', 'journal', 'notes', 'diary', 'mémoire', 'carnet'],
  gesture: 'The bookmark slides down to mark the page.',
  draw: [
    raised(rect(18, 12, 58, 74, 8, 'base'), path('M26 12H35V86H26A8 8 0 0 1 18 78V20A8 8 0 0 1 26 12Z', 'main')),
    inset(pill(43, 30, 24, 9, 'soft')),
    inset(pill(43, 45, 16, 6, 'mid')),
    part('bookmark', raised.small(path('M58 6H70V40L64 34L58 40Z', 'accent'))),
  ],
  motion: {
    bookmark: nudge({ y: 5, at: 0.45, duration: 550 }),
  },
});
