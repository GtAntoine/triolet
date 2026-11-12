/**
 * Starts a new icon: writes `icons/<name>.ts` from a template to fill in.
 *
 *   pnpm icon:new bell
 *
 * Refuses a name that is not kebab-case or that an icon already uses (as its name or an alias).
 */
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ICONS_DIR, iconNames, loadIcon } from './lib/icons.ts';

const name = process.argv[2];
if (!name || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name)) {
  console.error('Usage: pnpm icon:new <name>   (kebab-case, e.g. shopping-cart)');
  process.exit(1);
}
const file = join(ICONS_DIR, `${name}.ts`);
if (existsSync(file)) {
  console.error(`icons/${name}.ts already exists.`);
  process.exit(1);
}
for (const other of iconNames()) {
  // An icon still being drawn (a template not filled in yet) must not block a new one.
  const icon = await loadIcon(other).catch(() => null);
  if (!icon) continue;
  if (icon.aliases.includes(name)) {
    console.error(`"${name}" is already an alias of the icon "${icon.name}". Draw another icon, or improve that one.`);
    process.exit(1);
  }
  if (icon.keywords.includes(name)) console.warn(`Note: "${icon.name}" has "${name}" among its keywords. Check it is not the same icon.`);
}

const template = `import { circle, icon, inset, part, pop, raised, rect } from '@triolet/core';

export default icon({
  name: '${name}',
  // One of the categories listed in the drawing guide.
  category: 'TODO',
  // What people type to find it: at least four words, lower case.
  keywords: ['TODO'],
  // One sentence: what moves and what it tells.
  gesture: 'TODO',
  draw: [
    // Largest shape first, on the 96 × 96 grid. Each shape names its colour role:
    // base (60 %), main (30 %), accent (10 %), plus soft, mid, mainLight, on, gap.
    raised(rect(16, 20, 64, 56, 10, 'base')),
    // A moving piece is a named part.
    part('dot', inset(circle(62, 38, 7, 'accent'))),
  ],
  motion: {
    dot: pop(),
  },
});
`;
writeFileSync(file, template);
console.log(`icons/${name}.ts written.

Next:
  1. draw it (the guide is in skills/triolet-icon/references/)
  2. pnpm icon:check ${name}     colours, footprint, legibility, gesture, name
  3. pnpm icon:sheet ${name}     look at it at 96, 48 and 24 px, and at its gesture
  4. pnpm icons                  when it is right: writes model/ and svg/`);
