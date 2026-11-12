import { draw, icon, inset, part, path, plain, raised, stroke } from '@triolet/core';

export default icon({
  name: 'shield',
  aliases: ['shield-check'],
  category: 'security',
  keywords: ['shield', 'security', 'protection', 'safe', 'verified', 'guard', 'bouclier', 'sécurité'],
  gesture: 'The check draws itself on the shield.',
  draw: [
    raised(path('M48 12L78 23V46C78 64 66 78 48 86C30 78 18 64 18 46V23Z', 'base', { outline: 3 })),
    inset(path('M48 25L66 32V46C66 58 59 67 48 73C37 67 30 58 30 46V32Z', 'main')),
    part('check', plain(stroke('M39 47L46 54L58 40', 'accent', 6))),
  ],
  motion: {
    check: draw({ duration: 500 }),
  },
});
