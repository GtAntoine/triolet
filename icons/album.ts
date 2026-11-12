import { circle, icon, inset, nudge, part, raised, rect } from '@triolet/core';

export default icon({
  name: 'album',
  category: 'media',
  keywords: ['album', 'record', 'music', 'vinyl', 'sleeve', 'cover', 'pochette', 'disque'],
  gesture: 'The record slides out of its sleeve, then back in.',
  draw: [
    part('record', raised(circle(58, 48, 26, 'main')), inset(circle(58, 48, 8, 'base'))),
    // The sleeve, in front, with its cover art.
    raised(rect(12, 20, 54, 56, 9, 'base')),
    inset(circle(39, 48, 15, 'mid')),
    inset(circle(39, 48, 6, 'accent')),
  ],
  motion: {
    record: nudge({ x: 6, settle: true, duration: 650 }),
  },
});
