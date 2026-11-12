import { icon, inset, part, pill, plain, raised, rect, resize, travel } from '@triolet/core';

export default icon({
  name: 'devices',
  category: 'devices',
  keywords: ['devices', 'responsive', 'screen', 'phone', 'computer', 'sync', 'appareils', 'multi-écran'],
  gesture: 'The message arrives on the phone, in front of the screen.',
  draw: resize(
    [
    // The screen, behind.
    raised(rect(32, 56, 12, 12, 2, 'main'), pill(22, 65, 32, 7, 'main')),
    raised(rect(10, 16, 58, 42, 8, 'main')),
    inset(rect(16, 22, 46, 30, 4, 'base')),
    inset(pill(22, 28, 22, 6, 'mid')),
    inset(pill(22, 39, 14, 6, 'mid')),
    // The phone, in front, detached from the screen by a ring of the surface.
    plain(rect(55, 29, 34, 54, 10, 'gap')),
    raised(rect(58, 32, 28, 48, 7, 'main')),
    inset(rect(62, 38, 20, 32, 3, 'base')),
    part('message', inset(pill(65, 43, 14, 7, 'accent'))),
    inset(pill(65, 55, 10, 5, 'mid')),
    ],
    0.92,
  ),
  motion: {
    message: travel({ from: [0, -6], fade: true, duration: 500 }),
  },
});
