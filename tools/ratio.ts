/**
 * Prints the 60:30:10 measure of every icon and of the set.
 *   node tools/ratio.ts            a table; fails on an error (not on a warning)
 */
import { loadIcons } from './lib/icons.ts';
import { SET_TOLERANCE, judge, measure } from './lib/ratio.ts';

const icons = await loadIcons();
let failed = 0;
const sum = { base: 0, main: 0, accent: 0 };
console.log('icon                       base  main  accent');
for (const model of icons) {
  const ratio = measure(model);
  const { warnings, errors } = judge(ratio);
  sum.base += ratio.base;
  sum.main += ratio.main;
  sum.accent += ratio.accent;
  failed += errors.length;
  const cells = [ratio.base, ratio.main, ratio.accent].map((v) => v.toFixed(1).padStart(5)).join(' ');
  const notes = [...errors.map((e) => `ERROR ${e}`), ...warnings.map((w) => `warn ${w}`)].join('; ');
  console.log(`${model.name.padEnd(26)}${cells}   ${notes}`);
}
const mean = { base: sum.base / icons.length, main: sum.main / icons.length, accent: sum.accent / icons.length };
const cells = [mean.base, mean.main, mean.accent].map((v) => v.toFixed(1).padStart(5)).join(' ');
const off = Math.abs(mean.base - 60) > SET_TOLERANCE || Math.abs(mean.main - 30) > SET_TOLERANCE || Math.abs(mean.accent - 10) > SET_TOLERANCE;
console.log(`${'SET AVERAGE'.padEnd(26)}${cells}   ${off ? `warn more than ${SET_TOLERANCE} points from 60 / 30 / 10` : 'within 60 / 30 / 10'}`);
if (failed) process.exit(1);
