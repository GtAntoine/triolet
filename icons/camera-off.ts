import { circle, draw, icon, inset, part, path, plain, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'camera-off',
  category: 'media',
  keywords: ['camera', 'off', 'disabled', 'no photo', 'privacy', 'blocked', 'appareil photo', 'désactivé'],
  gesture: 'The bar crosses out the camera.',
  draw: [
    raised.small(path('M33 30L37 21A4 4 0 0 1 41 18H55A4 4 0 0 1 59 21L63 30Z', 'main')),
    raised(rect(12, 28, 72, 50, 10, 'base')),
    raised.small(circle(48, 54, 17, 'main')),
    inset(circle(48, 54, 9, 'soft')),
    part('bar', plain(stroke('M20 86L76 14', 'gap', 12)), raised.small(stroke('M20 86L76 14', 'accent', 6))),
  ],
  motion: {
    bar: draw({ duration: 450 }),
  },
});
