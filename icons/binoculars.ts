import { circle, icon, inset, part, pop, raised, rect } from '@triolet/core';

export default icon({
  name: 'binoculars',
  category: 'interface',
  keywords: ['binoculars', 'search', 'watch', 'observe', 'explore', 'find', 'jumelles', 'observer'],
  gesture: 'The focus wheel pops: the view sharpens.',
  draw: [
    // The two eyepieces, behind.
    raised.small(rect(19, 12, 20, 16, 5, 'base'), rect(57, 12, 20, 16, 5, 'base')),
    // The two barrels and their lenses.
    raised(rect(12, 22, 34, 62, 15, 'main'), rect(50, 22, 34, 62, 15, 'main')),
    inset(circle(29, 64, 11, 'base'), circle(67, 64, 11, 'base')),
    // The wheel between them is the accent.
    part('wheel', raised.small(circle(48, 38, 8, 'accent'))),
  ],
  motion: {
    wheel: pop(),
  },
});
