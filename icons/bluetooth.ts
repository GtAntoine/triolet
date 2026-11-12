import { circle, icon, part, pill, plain, pop, raised, stroke } from '@triolet/core';

export default icon({
  name: 'bluetooth',
  aliases: ['bluetooth-connected'],
  category: 'devices',
  keywords: ['bluetooth', 'wireless', 'pair', 'connect', 'device', 'signal', 'sans-fil', 'appairer'],
  gesture: 'The dot pops: a device is paired.',
  draw: [
    raised(pill(22, 12, 52, 72, 'base')),
    // The rune, in one line.
    raised.small(stroke('M36 37L59 58L47 69V27L59 38L36 59', 'main', 6)),
    part('dot', plain(circle(70, 22, 12, 'gap')), raised.small(circle(70, 22, 9, 'accent'))),
  ],
  motion: {
    dot: pop(),
  },
});
