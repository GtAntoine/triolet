import { circle, clip, icon, inset, part, path, plain, raised, rect, travel } from '@triolet/core';

export default icon({
  name: 'image',
  category: 'media',
  keywords: ['image', 'picture', 'photo', 'gallery', 'landscape', 'media', 'illustration', 'paysage'],
  gesture: 'The sun rises over the mountains.',
  draw: [
    raised(rect(12, 18, 72, 60, 10, 'base')),
    inset(rect(20, 26, 56, 44, 5, 'main')),
    // The sun is cut by the frame while it rises.
    clip(rect(20, 26, 56, 44, 5, 'main'), part('sun', plain(circle(60, 39, 6, 'accent')))),
    plain(path('M21 69L37 48L47 59L54 52L75 69Z', 'base')),
  ],
  motion: {
    sun: travel({ from: [0, 16], duration: 800 }),
  },
});
