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
