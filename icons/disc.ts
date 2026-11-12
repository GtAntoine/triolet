import { circle, icon, inset, part, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'disc',
  aliases: ['vinyl'],
  category: 'media',
  keywords: ['disc', 'cd', 'vinyl', 'album', 'record', 'music', 'disque', 'vinyle'],
  gesture: 'The disc makes one turn.',
  draw: [
    part(
      'disc',
      raised(circle(48, 48, 36, 'main')),
      // Two reflections on the grooves: they are what shows the disc turning.
      inset(stroke('M24 40A26 26 0 0 1 40 24', 'base', 5), stroke('M72 56A26 26 0 0 1 56 72', 'base', 5)),
      // The label and its hole.
      raised.small(circle(48, 48, 20, 'base')),
      inset(circle(48, 48, 8, 'accent')),
    ),
  ],
  motion: {
    disc: spin({ turns: 1, duration: 900, ease: 'inOut' }),
  },
});
