import { icon, nudge, part, path, plain, raised, stroke } from '@triolet/core';

const KEY = 'M36 22H76A10 10 0 0 1 86 32V56A10 10 0 0 1 76 66H36L12 44Z';

export default icon({
  name: 'backspace',
  category: 'interface',
  keywords: ['backspace', 'delete', 'erase', 'remove', 'key', 'clear', 'effacer', 'retour arrière'],
  gesture: 'The key is pressed, and comes back up.',
  draw: [
    // The side of the key, then its top: the top is what moves.
    raised(path('M36 32H76A10 10 0 0 1 86 42V66A10 10 0 0 1 76 76H36L12 54Z', 'main', { outline: 3 })),
    part('key', raised(path(KEY, 'base', { outline: 3 })), plain(stroke('M48 35L66 53', 'accent', 7), stroke('M66 35L48 53', 'accent', 7))),
  ],
  motion: {
    key: nudge({ y: 5, duration: 400 }),
  },
});
