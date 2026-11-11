/**
 * Checks icons: they compile, their three colours are in proportion, they keep to the
 * keyline shapes, they stay legible at 24 px, their gesture is sound and their name is free.
 *
 *   pnpm icon:check            every icon
 *   pnpm icon:check bell cart  some icons
 *
 * Errors fail the command; warnings are things to look at on the control sheet
 * (`pnpm icon:sheet <name>`).
 */
import { IconError, type IconModel } from '@triolet/core';
import { checkIcon } from './lib/check.ts';
import { iconNames, loadIcon } from './lib/icons.ts';

const wanted = process.argv.slice(2);
const names = iconNames();
for (const name of wanted) {
  if (!names.includes(name)) {
    console.error(`No icon named "${name}" (icons/${name}.ts does not exist).`);
    process.exit(1);
  }
}

// Every icon is loaded: a name can only be checked against the others.
const models: IconModel[] = [];
let failed = 0;
for (const name of names) {
  try {
    models.push(await loadIcon(name));
  } catch (error) {
    if (wanted.length && !wanted.includes(name)) continue;
    failed++;
    const message = error instanceof IconError || error instanceof Error ? error.message : String(error);
    console.log(`\n✖ ${name}\n    error    ${message}`);
  }
}

for (const model of models) {
  if (wanted.length && !wanted.includes(model.name)) continue;
  const report = checkIcon(model, models);
  const { base, main, accent } = report.ratio;
  const mark = report.errors.length ? '✖' : report.warnings.length ? '!' : '✔';
  const [, , w, h] = report.footprint.box;
  console.log(`\n${mark} ${model.name}   base ${base} · main ${main} · accent ${accent}   ${Math.round(w)} × ${Math.round(h)}, ${report.footprint.outside} % outside the keylines`);
  for (const error of report.errors) console.log(`    error    ${error}`);
  for (const warning of report.warnings) console.log(`    warning  ${warning}`);
  if (report.errors.length) failed++;
}

console.log(failed ? `\n${failed} icon(s) with errors` : '\nNo error');
if (failed) process.exit(1);
