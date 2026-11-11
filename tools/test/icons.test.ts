import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { test } from 'node:test';
import { fidelity } from '../fidelity.ts';
import { KNOWN_COLOUR_FAULTS, checkIcon } from '../lib/check.ts';
import { footprint, insideKeylines, judgeFootprint } from '../lib/footprint.ts';
import { ROOT, iconNames, loadIcons } from '../lib/icons.ts';
import { SET_TARGET, SET_TOLERANCE, judge, measure } from '../lib/ratio.ts';

test('every icon source compiles', async () => {
  const icons = await loadIcons();
  assert.ok(icons.length >= 31);
  assert.deepEqual(
    icons.map((i) => i.name),
    iconNames(),
  );
});

test('the committed model/ and svg/ files are up to date', () => {
  execFileSync(process.execPath, [join(ROOT, 'tools/build-icons.ts'), '--check'], { cwd: ROOT, stdio: 'pipe' });
});

test('ported icons match their original file pixel for pixel, unless retouched on purpose', async () => {
  const results = await fidelity();
  assert.deepEqual(
    results.filter((r) => r.status === 'differs'),
    [],
  );
  assert.ok(results.filter((r) => r.status === 'same').length >= 15, 'half of the original icons are untouched');
});

test('every icon passes icon:check without an error', async () => {
  const icons = await loadIcons();
  const failing = icons.map((icon) => checkIcon(icon, icons)).filter((report) => report.errors.length);
  assert.deepEqual(
    failing.map((report) => `${report.name}: ${report.errors.join('; ')}`),
    [],
  );
  assert.deepEqual(KNOWN_COLOUR_FAULTS, [], 'no icon is excused');
});

test('the set as a whole is within five points of 60 / 30 / 10', async () => {
  const icons = await loadIcons();
  const sum = { base: 0, main: 0, accent: 0 };
  for (const icon of icons) {
    const ratio = measure(icon);
    sum.base += ratio.base;
    sum.main += ratio.main;
    sum.accent += ratio.accent;
  }
  for (const key of ['base', 'main', 'accent'] as const) {
    const mean = sum[key] / icons.length;
    assert.ok(Math.abs(mean - SET_TARGET[key]) <= SET_TOLERANCE, `${key} averages ${mean.toFixed(1)} %, target ${SET_TARGET[key]}`);
  }
});

test('the colour bounds: errors for an accent out of hand, warnings for a colour nearly alone', () => {
  const errors = judge({ base: 58, main: 0, accent: 42, coverage: 30 }).errors.join('\n');
  assert.match(errors, /accent covers 42 %, more than 20 %/);
  assert.match(errors, /covers more than main/);
  assert.match(judge({ base: 80, main: 20, accent: 0, coverage: 30 }).errors.join('\n'), /no accent/);
  assert.deepEqual(judge({ base: 70, main: 21, accent: 9, coverage: 30 }), { warnings: [], errors: [] });
  assert.match(judge({ base: 0, main: 91, accent: 9, coverage: 30 }).warnings.join('\n'), /base 0 %/);
});

test('the footprint check singles out what is drawn outside the keyline shapes', async () => {
  assert.equal(insideKeylines(48, 12), true, 'the top of the circle');
  assert.equal(insideKeylines(16, 16), true, 'a corner of the square');
  assert.equal(insideKeylines(12, 14), false, 'a corner of the grid');
  const icons = await loadIcons();
  const find = (name: string) => icons.find((icon) => icon.name === name)!;
  assert.equal(footprint(find('life-buoy')).outside, 0, 'a round icon 68 across sits inside the circle');
  assert.deepEqual(footprint(find('credit-card')).box, [12, 22, 72, 52]);
  const remarks = judgeFootprint({ box: [6, 28, 85, 60], outside: 10.7 });
  assert.match(remarks[0]!, /10.7 % of the grid is drawn outside the keyline shapes/);
  assert.match(remarks[1]!, /off centre by 0.5 across and 10 down/);
  assert.match(judgeFootprint({ box: [30, 30, 36, 36], outside: 0 })[0]!, /looks small/);
});

test('a name already taken is refused', async () => {
  const icons = await loadIcons();
  const clash = { ...icons.find((icon) => icon.name === 'ballot-box')!, aliases: ['calendar-clock'] };
  assert.match(checkIcon(clash, icons).errors.join('\n'), /"calendar-clock" is already the name or an alias of "calendar-clock"/);
});
