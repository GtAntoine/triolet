import { circle, icon, inset, part, path, plain, pop, raised, resize } from '@triolet/core';

const EAR = 'M26 40A24 26 0 0 1 74 40C74 54 63 58 61 68A15 15 0 0 1 31 70C28 60 26 50 26 40Z';

export default icon({
  name: 'ear',
  category: 'health',
  keywords: ['ear', 'hear', 'listen', 'sound', 'hearing', 'audio', 'oreille', 'écouter'],
  gesture: 'The earring pops.',
  draw: [
    // The ear, dark, and its hollow: the same shape, smaller and lighter.
    raised(path(EAR, 'main')),
    ...resize([inset(path(EAR, 'base'))], 0.6, { about: [52, 42] }),
    // The earring, on the lobe: the accent.
    part('earring', plain(circle(40, 76, 9, 'gap')), raised.small(circle(40, 76, 6.5, 'accent'))),
  ],
  motion: {
    earring: pop(),
  },
});
