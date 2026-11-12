import { icon, inset, part, path, pill, raised, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'coffee',
  category: 'places',
  keywords: ['coffee', 'cup', 'tea', 'drink', 'break', 'cafe', 'café', 'tasse'],
  gesture: 'Steam rises from the cup.',
  draw: [
    part('steam-1', raised.small(stroke('M34 28C30 23 38 19 34 13', 'accent', 5))),
    part('steam-2', raised.small(stroke('M50 28C46 23 54 19 50 13', 'accent', 5))),
    raised.small(stroke('M62 44H70A9 9 0 0 1 70 62H62', 'main', 6)),
    raised(path('M18 36H66V60A18 18 0 0 1 48 78H36A18 18 0 0 1 18 60Z', 'base')),
    inset(pill(25, 41, 34, 7, 'main')),
    raised.small(pill(14, 80, 56, 7, 'main')),
  ],
  motion: {
    ...stagger(['steam-1', 'steam-2'], travel({ from: [0, 6], fade: true, duration: 600, ease: 'outSoft' }), 160),
  },
});
