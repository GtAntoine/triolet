import { icon, inset, nudge, part, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'paperclip',
  category: 'interface',
  keywords: ['paperclip', 'attachment', 'attach', 'file', 'clip', 'document', 'trombone', 'pièce jointe'],
  gesture: 'The clip slides onto the sheet.',
  draw: [
    raised(rect(20, 24, 56, 62, 9, 'base')),
    inset(pill(30, 52, 36, 7, 'mid')),
    inset(pill(30, 66, 22, 7, 'accent')),
    part('clip', raised.small(stroke('M58 14V38A9 9 0 0 1 40 38V18A5.5 5.5 0 0 1 51 18V36', 'main', 6))),
  ],
  motion: {
    clip: nudge({ y: -6, settle: true, duration: 550 }),
  },
});
