import { blink, icon, inset, part, path, plain, raised, rect, stroke } from '@triolet/core';

const windows = [46, 58].flatMap((y) => [30, 44, 58].map((x) => rect(x, y, 8, 8, 2, 'main')));

export default icon({
  name: 'hotel',
  category: 'places',
  keywords: ['hotel', 'stay', 'room', 'booking', 'travel', 'accommodation', 'hôtel', 'hébergement'],
  gesture: 'The door lights up: the hotel is open.',
  draw: [
    // The building and its sign band, as one object.
    raised(rect(20, 12, 56, 72, 9, 'base'), path('M29 12H67A9 9 0 0 1 76 21V38H20V21A9 9 0 0 1 29 12Z', 'main')),
    plain(stroke('M41 19V31M55 19V31M41 25H55', 'on', 4.5)),
    inset(...windows),
    part('door', inset(rect(40, 70, 16, 14, 4, 'accent'))),
  ],
  motion: {
    door: blink({ to: 0.2, duration: 450, iterations: 2 }),
  },
});
