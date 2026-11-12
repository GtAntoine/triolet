import { icon, inset, nudge, part, path, plain, raised, rect } from '@triolet/core';

export default icon({
  name: 'airplay',
  category: 'devices',
  keywords: ['airplay', 'screen', 'stream', 'tv', 'mirror', 'share', 'diffusion', 'écran'],
  gesture: 'The triangle rises towards the screen.',
  draw: [
    raised(rect(12, 14, 72, 52, 10, 'main')),
    inset(rect(18, 20, 60, 40, 5, 'base')),
    part('triangle', plain(path('M48 54L68 80H28Z', 'gap', { outline: 8 })), raised.small(path('M48 58L64 79H32Z', 'accent', { outline: 4 }))),
  ],
  motion: {
    triangle: nudge({ y: -5, settle: true, duration: 550 }),
  },
});
