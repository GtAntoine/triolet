import { icon, part, path, pop, raised, stagger } from '@triolet/core';

export default icon({
  name: 'sparkles',
  category: 'interface',
  keywords: ['sparkles', 'magic', 'ai', 'new', 'shine', 'generate', 'étincelles', 'magie'],
  gesture: 'The three sparkles shine, one after the other.',
  draw: [
    part('big', raised(path('M40 22C42.4 40 52 49.6 70 52C52 54.4 42.4 64 40 82C37.6 64 28 54.4 10 52C28 49.6 37.6 40 40 22Z', 'base', { outline: 3 }))),
    part('small', raised.small(path('M70 12C70.96 19.2 74.8 23.04 82 24C74.8 24.96 70.96 28.8 70 36C69.04 28.8 65.2 24.96 58 24C65.2 23.04 69.04 19.2 70 12Z', 'accent', { outline: 2 }))),
    part('tiny', raised.small(path('M70 52C71.28 61.6 76.4 66.72 86 68C76.4 69.28 71.28 74.4 70 84C68.72 74.4 63.6 69.28 54 68C63.6 66.72 68.72 61.6 70 52Z', 'main', { outline: 2 }))),
  ],
  motion: {
    ...stagger(['big', 'small', 'tiny'], pop({ scale: 1.2, duration: 420 }), 130),
  },
});
