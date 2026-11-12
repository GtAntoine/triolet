import { circle, icon, nudge, part, path, raised, rect } from '@triolet/core';

export default icon({
  name: 'mouse-pointer',
  aliases: ['mouse-pointer-2', 'cursor'],
  category: 'interface',
  keywords: ['pointer', 'cursor', 'mouse', 'click', 'select', 'arrow', 'curseur', 'pointeur'],
  gesture: 'The pointer moves to its target and clicks.',
  draw: [
    raised(circle(48, 48, 36, 'base')),
    raised.small(rect(53, 53, 16, 16, 5, 'accent')),
    part('pointer', raised.small(path('M30 26L64 41L49 47L43 62Z', 'main', { outline: 5 }))),
  ],
  motion: {
    pointer: nudge({ x: 6, y: 6, duration: 600, ease: 'inOut' }),
  },
});
