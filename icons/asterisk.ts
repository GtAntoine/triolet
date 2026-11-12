import { circle, icon, part, raised, spin, stroke } from '@triolet/core';

export default icon({
  name: 'asterisk',
  category: 'interface',
  keywords: ['asterisk', 'star', 'required', 'wildcard', 'note', 'footnote', 'astérisque', 'obligatoire'],
  gesture: 'The asterisk turns by one branch.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    part(
      'star',
      raised.small(stroke('M48 27V69', 'main', 7.5), stroke('M29.8 37.5L66.2 58.5', 'main', 7.5), stroke('M29.8 58.5L66.2 37.5', 'main', 7.5)),
      raised.small(circle(48, 48, 6, 'accent')),
    ),
  ],
  motion: {
    star: spin({ from: -60, duration: 600 }),
  },
});
