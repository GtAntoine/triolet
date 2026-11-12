import { icon, inset, nudge, part, path, pill, raised, rect, stroke } from '@triolet/core';

export default icon({
  name: 'backpack',
  category: 'education',
  keywords: ['backpack', 'bag', 'school', 'rucksack', 'travel', 'hike', 'sac à dos', 'cartable'],
  gesture: 'The flap of the pocket lifts and drops back.',
  draw: [
    // The handle, drawn first so it sits behind the body.
    raised.small(stroke('M39 28V23.5A9 9 0 0 1 57 23.5V28', 'main', 5)),
    // The body: the tall keyline, 56 wide, with round shoulders.
    raised(path('M42 22H54A22 22 0 0 1 76 44V74A10 10 0 0 1 66 84H30A10 10 0 0 1 20 74V44A22 22 0 0 1 42 22Z', 'base')),
    // The zip of the main compartment, pressed into the body.
    inset(pill(35, 35, 26, 5, 'main')),
    // The front pocket, light on the dark body.
    raised(rect(28, 54, 40, 23, 8, 'main')),
    // Its flap: the accent, and what moves.
    part('flap', raised.small(pill(27, 49, 42, 10, 'accent'))),
  ],
  motion: {
    flap: nudge({ y: -5, settle: true, duration: 550 }),
  },
});
