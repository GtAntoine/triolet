import { circle, icon, inset, part, plain, raised, stroke, nudge } from '@triolet/core';

export default icon({
  name: 'annoyed',
  category: 'social',
  keywords: ['annoyed', 'unamused', 'face', 'emoji', 'bored', 'irritated', 'agacé', 'blasé'],
  gesture: 'The eyes look away.',
  draw: [
    raised(circle(48, 48, 34, 'base')),
    inset(circle(28, 56, 5.5, 'accent'), circle(68, 56, 5.5, 'accent')),
    part('eyes', plain(stroke('M29 42H43', 'main', 7.5), stroke('M53 42H67', 'main', 7.5))),
    plain(stroke('M37 64L59 59', 'main', 6.5)),
  ],
  motion: {
    eyes: nudge({ x: 4, duration: 800, ease: 'inOut' }),
  },
});
