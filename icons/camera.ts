import { blink, circle, icon, inset, part, path, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'camera',
  category: 'media',
  keywords: ['camera', 'photo', 'picture', 'snapshot', 'lens', 'shoot', 'appareil photo', 'photographie'],
  gesture: 'The lens closes in and the flash goes off.',
  draw: [
    // The viewfinder hump, behind the body.
    raised.small(path('M33 30L37 21A4 4 0 0 1 41 18H55A4 4 0 0 1 59 21L63 30Z', 'main')),
    raised(rect(12, 28, 72, 50, 10, 'base')),
    part('lens', raised.small(circle(48, 54, 17, 'main')), inset(circle(48, 54, 9, 'soft'))),
    part('flash', inset(circle(71, 40, 4.5, 'accent'))),
  ],
  motion: {
    lens: pop({ scale: 1.1, duration: 450 }),
    flash: blink({ to: 0.15, duration: 300, delay: 150, iterations: 2 }),
  },
});
