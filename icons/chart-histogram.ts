import { icon, inset, part, pill, raised, rect, reveal, stagger } from '@triolet/core';

const bars = [14, 27, 40, 25, 12];

export default icon({
  name: 'chart-histogram',
  category: 'data',
  keywords: ['chart', 'histogram', 'distribution', 'bars', 'frequency', 'statistics', 'histogramme', 'répartition'],
  gesture: 'The bars rise, from left to right.',
  draw: [
    raised(rect(14, 14, 68, 68, 16, 'base')),
    inset(pill(22, 70, 52, 4.5, 'mid')),
    ...bars.map((height, i) => part(`bar-${i + 1}`, inset(rect(25.5 + i * 9, 69 - height, 9, height, 2.5, i === 2 ? 'accent' : 'main')))),
  ],
  motion: {
    ...stagger(['bar-1', 'bar-2', 'bar-3', 'bar-4', 'bar-5'], reveal({ from: 'bottom', amount: 0.15, duration: 380 }), 80),
  },
});
