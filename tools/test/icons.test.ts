import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { test } from 'node:test';
import { fidelity } from '../fidelity.ts';
import { ROOT, iconNames, loadIcons } from '../lib/icons.ts';

test('every icon source compiles', async () => {
  const icons = await loadIcons();
  assert.ok(icons.length >= 5);
  assert.deepEqual(
    icons.map((i) => i.name),
    iconNames(),
  );
});

test('the committed model/ and svg/ files are up to date', () => {
  execFileSync(process.execPath, [join(ROOT, 'tools/build-icons.ts'), '--check'], { cwd: ROOT, stdio: 'pipe' });
});

test('ported icons match their original file pixel for pixel', async () => {
  const differing = (await fidelity()).filter((r) => r.status === 'differs');
  assert.deepEqual(differing, []);
});

test('every icon passes icon:check without an error', async () => {
  const { checkIcon } = await import('../lib/check.ts');
  const icons = await loadIcons();
  const failing = icons.map((icon) => checkIcon(icon, icons)).filter((report) => report.errors.length);
  assert.deepEqual(failing.map((report) => `${report.name}: ${report.errors.join('; ')}`), []);
});

test('the footprint check singles out what is drawn outside the keyline shapes', async () => {
  const { footprint, insideKeylines, judgeFootprint } = await import('../lib/footprint.ts');
  assert.equal(insideKeylines(48, 12), true, 'the top of the circle');
  assert.equal(insideKeylines(16, 16), true, 'a corner of the square');
  assert.equal(insideKeylines(12, 14), false, 'a corner of the grid');
  const icons = await loadIcons();
  const find = (name: string) => icons.find((icon) => icon.name === name)!;
  assert.equal(footprint(find('support')).outside, 0, 'a round icon 68 across sits inside the circle');
  assert.deepEqual(footprint(find('paiement')).box, [12, 22, 72, 52]);
  assert.match(judgeFootprint(footprint(find('cloisonnement'))).join('\n'), /outside the keyline shapes[\s\S]*off centre by 0 across and 10 down/);
});

test('a new fault in the colours is an error, a known one a warning', async () => {
  const { checkIcon, KNOWN_COLOUR_FAULTS } = await import('../lib/check.ts');
  const icons = await loadIcons();
  const support = icons.find((icon) => icon.name === 'support')!;
  assert.ok(KNOWN_COLOUR_FAULTS.includes('support'));
  assert.equal(checkIcon(support, icons).errors.length, 0);
  // The same drawing under a new name has no excuse.
  const copy = { ...support, name: 'buoy' };
  assert.match(checkIcon(copy, [...icons, copy]).errors.join('\n'), /accent covers 42.1 %, more than 20 %/);
  // And a name already taken is refused.
  const clash = { ...icons.find((icon) => icon.name === 'voter')!, aliases: ['agenda'] };
  assert.match(checkIcon(clash, icons).errors.join('\n'), /"agenda" is already the name or an alias of "agenda"/);
});
