import { blink, circle, icon, inset, part, plain, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'cast',
  category: 'devices',
  keywords: ['cast', 'screen', 'stream', 'tv', 'mirror', 'airplay', 'diffuser', 'écran'],
  gesture: 'The waves light up one after the other: the screen is casting.',
  draw: [
    raised(rect(12, 20, 72, 56, 10, 'main')),
    inset(rect(18, 26, 60, 44, 5, 'base')),
    // The signal, in the corner of the screen.
    plain(circle(26, 62, 4, 'accent')),
    part('wave-1', plain(stroke('M25 50A13 13 0 0 1 38 63', 'accent', 5))),
    part('wave-2', plain(stroke('M25 38A25 25 0 0 1 50 63', 'accent', 5))),
  ],
  motion: {
    ...stagger(['wave-1', 'wave-2'], blink({ to: 0.15, duration: 600 }), 180),
  },
});
