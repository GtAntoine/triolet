import { icon, inset, part, path, pop, raised, rect } from '@triolet/core';

const columns = [19, 39.5, 60];
const rowsY = [43, 59];

export default icon({
  name: 'table',
  category: 'data',
  keywords: ['table', 'grid', 'spreadsheet', 'cells', 'rows', 'columns', 'tableau', 'grille'],
  gesture: 'One cell of the table lights up.',
  draw: [
    raised(rect(12, 18, 72, 62, 10, 'base'), path('M22 18H74A10 10 0 0 1 84 28V36H12V28A10 10 0 0 1 22 18Z', 'main')),
    rowsY.flatMap((y, r) =>
      columns.map((x, c) => (r === 0 && c === 1 ? part('cell', inset(rect(x, y, 17, 11, 3, 'accent'))) : inset(rect(x, y, 17, 11, 3, 'soft')))),
    ),
  ],
  motion: {
    cell: pop({ scale: 1.25, duration: 450 }),
  },
});
