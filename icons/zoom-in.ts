import { circle, icon, part, pop, raised, stroke } from '@triolet/core';

export default icon({
  name: 'zoom-in',
  category: 'interface',
  keywords: ['zoom', 'in', 'magnify', 'scale', 'search', 'enlarge', 'loupe', 'agrandir'],
  gesture: 'The lens grows a little, and comes back.',
  draw: [
    raised.small(stroke('M62 62L80 80', 'main', 10)),
    part('lens', raised(circle(40, 40, 27, 'main')), raised.small(circle(40, 40, 22, 'base')), raised.small(stroke('M31 41H49M40 32V50', 'accent', 6.5))),
  ],
  motion: {
    lens: pop({ scale: 1.1, duration: 450, pivot: [40, 40] }),
  },
});
