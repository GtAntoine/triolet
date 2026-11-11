/** Loads the icon sources of `icons/` and compiles them. */
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { compileIcon, type IconModel, type IconSource } from '@triolet/core';

export const ROOT = fileURLToPath(new URL('../../', import.meta.url));
export const ICONS_DIR = join(ROOT, 'icons');

/** Names of the icon sources, sorted. Files starting with `_` are shared helpers. */
export function iconNames(): string[] {
  return readdirSync(ICONS_DIR)
    .filter((f) => f.endsWith('.ts') && !f.startsWith('_'))
    .map((f) => f.slice(0, -3))
    .sort();
}

export async function loadIcon(name: string): Promise<IconModel> {
  const mod = (await import(pathToFileURL(join(ICONS_DIR, `${name}.ts`)).href)) as { default?: IconSource };
  if (!mod.default) throw new Error(`icons/${name}.ts has no default export (export default icon({ … }))`);
  if (mod.default.name !== name) throw new Error(`icons/${name}.ts declares the name "${mod.default.name}": file and name must match`);
  return compileIcon(mod.default);
}

export async function loadIcons(names: string[] = iconNames()): Promise<IconModel[]> {
  return Promise.all(names.map(loadIcon));
}
