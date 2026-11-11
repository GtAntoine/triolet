import { blink, circle, icon, inset, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'video',
  category: 'media',
  keywords: ['video', 'camera', 'film', 'record', 'movie', 'call', 'vidéo', 'caméra'],
  gesture: 'The recording light blinks twice.',
  draw: [
    raised(path('M60 42L80 31A3 3 0 0 1 84 34V62A3 3 0 0 1 80 65L60 54Z', 'main')),
    raised(rect(12, 26, 52, 44, 10, 'base')),
    inset(pill(22, 52, 32, 8, 'mid')),
    part('light', inset(circle(27, 39, 5, 'accent'))),
  ],
  motion: {
    light: blink({ to: 0.15, duration: 350, iterations: 2 }),
  },
});
