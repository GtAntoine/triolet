/**
 * Pixel comparison of the ported icons with the original files (`reference/pictos/*.svg`,
 * written by the old generator): same palette, 96 px, on a transparent ground.
 *
 *   node tools/fidelity.ts           one line per icon; fails if any differs
 *   node tools/fidelity.ts --sheet   also writes out/fidelity/<name>-{reference,port}.png
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ORIGINAL_THEME, renderStaticSvg } from '@triolet/core';
import { ROOT, loadIcons } from './lib/icons.ts';
import { compare, png, rasterize } from './lib/raster.ts';

/** Icons redrawn on purpose since the port (proportions): not expected to match. */
export const RETOUCHED: readonly string[] = [];

const SIZE = 96;
/** Largest channel gap still counted as identical (rounding of a blur). */
const TOLERANCE = 1;

export interface Fidelity {
  name: string;
  status: 'same' | 'differs' | 'retouched' | 'new';
  differing: number;
  worst: number;
}

const referenceFile = (name: string) => join(ROOT, 'reference/pictos', `${name}.svg`);

export async function fidelity(): Promise<Fidelity[]> {
  const out: Fidelity[] = [];
  for (const model of await loadIcons()) {
    const file = referenceFile(model.name);
    if (!existsSync(file)) {
      out.push({ name: model.name, status: 'new', differing: 0, worst: 0 });
      continue;
    }
    const reference = rasterize(readFileSync(file, 'utf8'), SIZE);
    const port = rasterize(renderStaticSvg(model, ORIGINAL_THEME), SIZE);
    const { differing, worst } = compare(reference, port);
    const status = RETOUCHED.includes(model.name) ? 'retouched' : worst <= TOLERANCE ? 'same' : 'differs';
    out.push({ name: model.name, status, differing, worst });
  }
  return out;
}

if (import.meta.main) {
  const results = await fidelity();
  for (const r of results) {
    const detail = r.status === 'new' ? 'no reference' : `${r.differing} px differ, worst gap ${r.worst}/255`;
    console.log(`${r.status.padEnd(9)} ${r.name.padEnd(26)} ${detail}`);
  }
  if (process.argv.includes('--sheet')) {
    const dir = join(ROOT, 'out/fidelity');
    mkdirSync(dir, { recursive: true });
    for (const model of await loadIcons()) {
      const file = referenceFile(model.name);
      if (!existsSync(file)) continue;
      writeFileSync(join(dir, `${model.name}-reference.png`), png(readFileSync(file, 'utf8'), 384, '#F5F5F4'));
      writeFileSync(join(dir, `${model.name}-port.png`), png(renderStaticSvg(model, ORIGINAL_THEME), 384, '#F5F5F4'));
    }
    console.log(`Sheets written to ${dir}`);
  }
  const failed = results.filter((r) => r.status === 'differs');
  if (failed.length) {
    console.error(`${failed.length} icon(s) differ from their reference`);
    process.exit(1);
  }
}
