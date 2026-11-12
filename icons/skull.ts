import { circle, icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'skull',
  category: 'security',
  keywords: ['skull', 'danger', 'death', 'poison', 'toxic', 'pirate', 'crâne', 'mort'],
  gesture: 'The jaw of the skull chatters twice.',
  draw: [
    // The jaw, behind, and its teeth: it is what moves.
    part('jaw', raised(rect(31, 54, 34, 30, 9, 'base')), inset(pill(40, 70, 4, 11, 'main'), pill(46, 70, 4, 11, 'main'), pill(52, 70, 4, 11, 'main'))),
    raised(circle(48, 40, 30, 'base')),
    inset(circle(36, 42, 8.5, 'main'), circle(60, 42, 8.5, 'main')),
    inset(path('M48 53L52.5 60H43.5Z', 'main')),
    // One eye glows: the accent.
    inset(circle(60, 42, 4, 'accent')),
  ],
  motion: {
    jaw: nudge({ y: 4, duration: 280, iterations: 2 }),
  },
});
