import { icon, inset, nudge, part, path, pill, raised, stroke } from '@triolet/core';

export default icon({
  name: 'upload',
  category: 'arrows',
  keywords: ['upload', 'send', 'export', 'publish', 'file', 'share', 'téléverser', 'envoyer'],
  gesture: 'The arrow leaves the tray.',
  draw: [
    raised(path('M14 56H82V72A10 10 0 0 1 72 82H24A10 10 0 0 1 14 72Z', 'base')),
    inset(pill(28, 65, 40, 7, 'main')),
    part('arrow', raised.small(stroke('M48 50V16M34 28L48 14L62 28', 'main', 8)), raised.small(stroke('M48 47V51', 'accent', 8))),
  ],
  motion: {
    arrow: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
