/**
 * Compiles every `icons/<name>.ts` and writes what is generated from it:
 *   model/<name>.json   the model every renderer reads
 *   svg/<name>.svg      a standalone file in the default colours
 * Both are committed. `--check` writes nothing and fails if a file is out of date.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderStaticSvg } from '@triolet/core';
import { ROOT, loadIcons } from './lib/icons.ts';
import { stringify } from './lib/json.ts';

const check = process.argv.includes('--check');
const icons = await loadIcons();
const stale: string[] = [];

function emit(dir: string, files: Map<string, string>) {
  const abs = join(ROOT, dir);
  if (!check) mkdirSync(abs, { recursive: true });
  for (const [file, content] of files) {
    const target = join(abs, file);
    const current = existsSync(target) ? readFileSync(target, 'utf8') : null;
    if (current === content) continue;
    if (check) stale.push(`${dir}/${file}`);
    else writeFileSync(target, content);
  }
  for (const file of existsSync(abs) ? readdirSync(abs) : []) {
    if (files.has(file)) continue;
    if (check) stale.push(`${dir}/${file} (no source)`);
    else rmSync(join(abs, file));
  }
}

emit('model', new Map(icons.map((m) => [`${m.name}.json`, stringify(m) + '\n'])));
emit('svg', new Map(icons.map((m) => [`${m.name}.svg`, renderStaticSvg(m)])));

if (stale.length) {
  console.error(`Generated files are out of date (run "pnpm icons"):\n  ${stale.join('\n  ')}`);
  process.exit(1);
}
console.log(`${icons.length} icons ${check ? 'up to date' : 'written'} (model/, svg/)`);
