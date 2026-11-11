import { circle, ellipse, icon, inset, nudge, part, path, plain, raised, resize, stroke, tracks } from '@triolet/core';

const float = { y: -4, duration: 3200, ease: 'inOut', iterations: 'infinite' } as const;

export default icon({
  name: 'pin-question',
  aliases: ['perdu'],
  category: 'places',
  keywords: ['not found', 'lost', '404', 'missing', 'question', 'unknown', 'perdu', 'introuvable'],
  gesture: 'The pin floats, looking for a place to land, and its shadow shrinks under it.',
  idle: true,
  draw: resize(
    [
      part('ground', inset(ellipse(44, 89, 13, 3.5, 'soft'))),
      part('pin', raised(path('M44 84C38 76 20 58 20 39A24 24 0 0 1 68 39C68 58 50 76 44 84Z', 'main')), inset(circle(44, 39, 9.5, 'base'))),
      part(
        'badge',
        plain(circle(69, 21, 16, 'gap')),
        raised.small(circle(69, 21, 13, 'accent')),
        plain(stroke('M64.6 17.4A4.6 4.6 0 1 1 71.2 21.4C69.8 22.2 69 23 69 24.8', 'on', 3.2), circle(69, 29.6, 2, 'on')),
      ),
    ],
    0.9,
  ),
  motion: {
    // The shadow on the ground narrows and fades while the pin is up.
    ground: tracks({ duration: 3200, ease: 'inOut', iterations: 'infinite' }, { scaleX: [[0.5, 0.8]], opacity: [[0.5, 0.7]] }),
    pin: nudge(float),
    badge: nudge({ ...float, delay: 250 }),
  },
});
