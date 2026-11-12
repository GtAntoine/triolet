import { circle, ellipse, icon, inset, nudge, part, path, pill, raised, rect } from '@triolet/core';

export default icon({
  name: 'skull',
  category: 'security',
  keywords: ['skull', 'danger', 'death', 'poison', 'toxic', 'pirate', 'crâne', 'mort'],
  gesture: 'The jaw of the skull chatters twice.',
  draw: [
    // The jaw, behind, narrower than the head, with its teeth: it is what moves.
    part('jaw', raised(rect(29, 52, 38, 32, 11, 'base')), inset(pill(38.5, 70, 4.5, 12, 'main'), pill(45.75, 70, 4.5, 12, 'main'), pill(53, 70, 4.5, 12, 'main'))),
    // The head: a wide dome that narrows at the cheekbones.
    raised(path('M48 10C27 10 14 25 14 42C14 53 19 60 26 64A5 5 0 0 0 31 68H65A5 5 0 0 0 70 64C77 60 82 53 82 42C82 25 69 10 48 10Z', 'base')),
    // The sockets, tilted, with a glow in each: the accent.
    inset(ellipse(34, 43, 10, 11, 'main', { rotate: [-12, 34, 43] }), ellipse(62, 43, 10, 11, 'main', { rotate: [12, 62, 43] })),
    inset(circle(35, 44, 6, 'accent'), circle(61, 44, 6, 'accent')),
    inset(path('M48 54L52.5 62H43.5Z', 'main', { outline: 2 })),
  ],
  motion: {
    jaw: nudge({ y: 4, duration: 280, iterations: 2 }),
  },
});
