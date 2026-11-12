import { ellipse, icon, inset, part, path, plain, raised, stagger, stroke, travel } from '@triolet/core';

export default icon({
  name: 'database',
  category: 'data',
  keywords: ['database', 'data', 'storage', 'sql', 'records', 'server', 'base de données', 'stockage'],
  gesture: 'The layers of data settle one after the other.',
  draw: [
    raised(path('M16 26A32 10 0 0 1 80 26V70A32 10 0 0 1 16 70Z', 'base')),
    inset(ellipse(48, 26, 32, 10, 'soft')),
    part('layer-1', plain(stroke('M16 43A32 10 0 0 0 80 43', 'main', 5))),
    part('layer-2', plain(stroke('M16 58A32 10 0 0 0 80 58', 'accent', 5))),
  ],
  motion: {
    ...stagger(['layer-1', 'layer-2'], travel({ from: [0, -6], fade: true, duration: 450 }), 150),
  },
});
