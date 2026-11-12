import { icon, inset, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

export default icon({
  name: 'laptop',
  category: 'devices',
  keywords: ['laptop', 'computer', 'notebook', 'macbook', 'device', 'work', 'ordinateur portable', 'portable'],
  gesture: 'The lines appear on the screen, one after the other.',
  draw: [
    raised(rect(18, 16, 60, 46, 9, 'main')),
    inset(rect(24, 22, 48, 34, 4, 'base')),
    part('line-1', inset(pill(30, 28, 26, 9, 'accent'))),
    part('line-2', inset(pill(30, 42, 36, 7, 'mid'))),
    // The deck, in front.
    raised(pill(8, 64, 80, 13, 'base')),
    inset(pill(40, 66, 16, 4, 'mid')),
  ],
  motion: {
    ...stagger(['line-1', 'line-2'], reveal({ duration: 400 }), 120),
  },
});
