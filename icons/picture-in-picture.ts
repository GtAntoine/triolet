import { icon, inset, part, raised, rect, travel } from '@triolet/core';

export default icon({
  name: 'picture-in-picture',
  category: 'media',
  keywords: ['picture-in-picture', 'pip', 'video', 'overlay', 'window', 'floating', 'incrustation', 'vidéo'],
  gesture: 'The small window comes out of the screen and settles in its corner.',
  draw: [
    raised(rect(12, 20, 72, 56, 10, 'main')),
    inset(rect(18, 26, 60, 44, 5, 'base')),
    part('window', raised.small(rect(45, 45, 28, 20, 5, 'accent'))),
  ],
  motion: {
    window: travel({ from: [-20, -14], duration: 550 }),
  },
});
