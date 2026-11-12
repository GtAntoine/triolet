import { icon, inset, nudge, part, path, raised } from '@triolet/core';

const sheet = (y: number) => `M48 ${14 + y}L82 ${31 + y}L48 ${48 + y}L14 ${31 + y}Z`;

export default icon({
  name: 'layers',
  category: 'design',
  keywords: ['layers', 'stack', 'levels', 'overlay', 'sheets', 'depth', 'calques', 'couches'],
  gesture: 'The three layers come apart, then stack again.',
  draw: [
    part('bottom', raised(path(sheet(30), 'main', { outline: 5 }))),
    raised(path(sheet(15), 'soft', { outline: 5 })),
    part('top', raised(path(sheet(0), 'base', { outline: 5 })), inset(path('M48 21L66 31L48 41L30 31Z', 'accent', { outline: 2 }))),
  ],
  motion: {
    top: nudge({ y: -4, duration: 650, ease: 'inOut' }),
    bottom: nudge({ y: 4, duration: 650, ease: 'inOut' }),
  },
});
