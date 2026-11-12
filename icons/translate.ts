import { icon, inset, part, plain, pop, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'translate',
  category: 'communication',
  keywords: ['translate', 'language', 'translation', 'locale', 'international', 'speak', 'traduire', 'langue'],
  gesture: 'The second square pops: the text is translated.',
  draw: [
    part('second', raised(rect(38, 38, 46, 46, 11, 'main')), plain(stroke('M51 56H71M61 50V56M55 68C60 66 65 62 67 56M57 60C60 65 65 68 70 68', 'accent', 4.5))),
    raised(rect(12, 12, 46, 46, 11, 'base')),
    plain(stroke('M24 46L35 22L46 46M28 38H42', 'main', 5.5)),
  ],
  motion: {
    second: pop({ scale: 1.12, duration: 480 }),
  },
});
