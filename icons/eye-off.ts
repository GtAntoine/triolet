import { circle, clip, draw, icon, inset, part, path, plain, raised, stroke } from '@triolet/core';

const outline = 'M10 48C22 30 36 22 48 22C60 22 74 30 86 48C74 66 60 74 48 74C36 74 22 66 10 48Z';

export default icon({
  name: 'eye-off',
  category: 'interface',
  keywords: ['eye', 'hide', 'hidden', 'invisible', 'password', 'private', 'masquer', 'caché'],
  gesture: 'The bar crosses out the eye.',
  draw: [
    raised(path(outline, 'base')),
    clip(path(outline, 'base'), inset(circle(48, 48, 18, 'main'))),
    part('bar', plain(stroke('M22 76L74 20', 'gap', 11)), raised.small(stroke('M22 76L74 20', 'accent', 5.5))),
  ],
  motion: {
    bar: draw({ duration: 450 }),
  },
});
