import { clip, icon, inset, part, pill, raised, rect, tracks } from '@triolet/core';

export default icon({
  name: 'ballot-box',
  aliases: ['voter'],
  category: 'civic',
  keywords: ['vote', 'ballot', 'election', 'poll', 'urn', 'urne', 'bulletin', 'scrutin'],
  gesture: 'The ballot drops into the box, then a new one comes up.',
  draw: [
    raised(rect(18, 44, 60, 40, 8, 'main')),
    raised(rect(14, 35, 68, 15, 7, 'base')),
    inset(pill(31, 39.5, 34, 6, 'main')),
    // The ballot goes into the slot: it is cut at the middle of the slot.
    clip(rect(0, 0, 96, 42.5, 0, 'base'), part('ballot', raised.small(rect(38, 12, 20, 36, 3, 'accent', { rotate: [18, 48, 30] })))),
  ],
  motion: {
    // Down into the slot, gone, then back from just above its place.
    ballot: tracks(
      { duration: 900, ease: 'inOut' },
      {
        x: [[0.5, 3], [0.51, 3], [0.52, -2], [1, 0]],
        y: [[0.5, 15], [0.51, 15], [0.52, -6], [1, 0]],
        opacity: [[0.5, 1], [0.51, 0], [0.52, 0], [1, 1]],
      },
    ),
  },
});
