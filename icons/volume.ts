import { icon, part, path, raised, rect, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'volume',
  category: 'media',
  keywords: ['volume', 'sound', 'speaker', 'audio', 'loud', 'unmute', 'son', 'haut-parleur'],
  gesture: 'The sound waves leave the speaker one after the other.',
  draw: [
    raised(path('M28 37L48 21A2 2 0 0 1 51 23V73A2 2 0 0 1 48 75L28 59Z', 'base')),
    raised(rect(10, 36, 22, 24, 6, 'main')),
    part('wave-1', raised.small(stroke('M60 37A15 15 0 0 1 60 59', 'accent', 6))),
    part('wave-2', raised.small(stroke('M70 27A29 29 0 0 1 70 69', 'main', 6))),
  ],
  motion: {
    ...stagger(['wave-1', 'wave-2'], travel({ from: [-5, 0], fade: true, duration: 450, ease: 'outSoft' }), 150),
  },
});
