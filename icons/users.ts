import { circle, icon, inset, nudge, part, path, pop, raised, resize } from '@triolet/core';

export default icon({
  name: 'users',
  category: 'people',
  keywords: ['users', 'people', 'group', 'team', 'members', 'community', 'utilisateurs', 'équipe'],
  gesture: 'The second person steps closer and the badge pops.',
  draw: resize(
    [
      raised(circle(48, 50, 35, 'base')),
      part('friend', raised(circle(63, 35, 10, 'soft'), path('M43 80V75A20 19 0 0 1 83 75V80Z', 'soft'))),
      raised(circle(38, 38, 12, 'main'), path('M13 84V80A25 24 0 0 1 63 80V84Z', 'main')),
      part('badge', inset(circle(38, 70, 9, 'accent'))),
    ],
    1,
    { move: [0, -6] },
  ),
  motion: {
    friend: nudge({ x: -5, duration: 600 }),
    badge: pop({ duration: 400, delay: 250 }),
  },
});
