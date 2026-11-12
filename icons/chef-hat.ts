import { circle, icon, inset, part, pill, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'chef-hat',
  category: 'social',
  keywords: ['chef', 'hat', 'cook', 'kitchen', 'recipe', 'restaurant', 'toque', 'cuisine'],
  gesture: 'The top of the hat puffs up.',
  draw: [
    // The top: three puffs and a body that merge into one shape.
    part('top', raised(circle(30, 36, 17, 'base'), circle(48, 28, 19, 'base'), circle(66, 36, 17, 'base'), rect(27, 36, 42, 30, 4, 'base'))),
    // The band, and its mark: the accent.
    raised.small(rect(25, 62, 46, 18, 6, 'main')),
    inset(pill(41, 68, 14, 6, 'accent')),
  ],
  motion: {
    top: pop({ scale: 1.08, duration: 550, pivot: 'bottom' }),
  },
});
