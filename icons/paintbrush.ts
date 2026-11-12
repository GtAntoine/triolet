import { icon, part, path, plain, raised, stroke, swing, draw } from '@triolet/core';

export default icon({
  name: 'paintbrush',
  category: 'design',
  keywords: ['paintbrush', 'brush', 'paint', 'draw', 'art', 'design', 'pinceau', 'peindre'],
  gesture: 'The brush paints a stroke.',
  draw: [
    part('paint', plain(stroke('M18 82C28 78 38 85 50 81', 'accent', 6))),
    part(
      'brush',
      raised(stroke('M76 14L50 44', 'main', 10)),
      raised.small(stroke('M51 43L44 51', 'mid', 13)),
      raised.small(path('M38 48L50 58C48 68 40 75 26 76C32 70 30 62 34 54Z', 'base', { outline: 3 })),
    ),
  ],
  motion: {
    paint: draw({ duration: 600 }),
    brush: swing({ angles: [-7, 6], pivot: [76, 14], duration: 700 }),
  },
});
