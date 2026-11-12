import { icon, part, plain, pop, raised, rect, stagger, stroke } from '@triolet/core';

export default icon({
  name: 'gif',
  category: 'media',
  keywords: ['gif', 'animation', 'image', 'loop', 'meme', 'animated', 'boucle', 'image animée'],
  gesture: 'The three letters pop one after the other.',
  draw: [
    raised(rect(12, 24, 72, 48, 12, 'base')),
    part('g', plain(stroke('M38 41A8.5 8.5 0 1 0 39 54V49H33', 'main', 5.5))),
    part('i', plain(stroke('M49 38V58', 'main', 5.5))),
    part('f', plain(stroke('M59 58V38H69M59 48H66', 'accent', 5.5))),
  ],
  motion: {
    ...stagger(['g', 'i', 'f'], pop({ scale: 1.25, duration: 380 }), 120),
  },
});
