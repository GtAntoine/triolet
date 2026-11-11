import { icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'notebook',
  aliases: ['memoire'],
  category: 'documents',
  keywords: ['notebook', 'memory', 'bookmark', 'journal', 'notes', 'diary', 'mémoire', 'carnet'],
  gesture: 'The bookmark slides down to mark the page.',
  draw: [
    raised(rect(18, 12, 58, 74, 8, 'main'), path('M26 12H31V86H26Z', 'mainLight')),
    inset(pill(40, 30, 26, 9, 'base')),
    inset(pill(40, 45, 18, 6, 'mainLight')),
    part('bookmark', raised.small(path('M58 6H70V40L64 34L58 40Z', 'accent'))),
  ],
  motion: {
    bookmark: nudge({ y: 5, at: 0.45, duration: 550 }),
  },
});
