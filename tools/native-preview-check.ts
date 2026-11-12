/**
 * Looks at the React Native package without a device: starts the Expo example for the web
 * (Skia through CanvasKit), opens it in Chromium and takes screenshots into out/native/.
 * It proves that the package bundles, renders and animates; it says nothing about frame rates
 * or colours on a phone.
 *
 *   pnpm build && node tools/native-preview-check.ts      (needs `npm install` in examples/expo)
 */
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from './lib/icons.ts';

const PORT = 8098;
const out = join(ROOT, 'out/native');
mkdirSync(out, { recursive: true });

// TRIOLET_SKIA_WEB makes the browser load the Skia renderer instead of the SVG components.
const server = spawn(`npx expo start --web --clear --port ${PORT}`, {
  cwd: join(ROOT, 'examples/expo'),
  shell: true,
  stdio: 'ignore',
  env: { ...process.env, CI: '1', TRIOLET_SKIA_WEB: '1' },
});
const stop = () => {
  // On Windows the shell that started the server has to be ended with its children.
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], { stdio: 'ignore' });
  else server.kill();
};

let failed = 0;
const check = (ok: boolean, message: string) => {
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${message}`);
};

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 2 });
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // The first bundle takes a while.
  let loaded = false;
  for (let i = 0; i < 90 && !loaded; i++) {
    try {
      await page.goto(`http://localhost:${PORT}/`, { timeout: 5000 });
      await page.getByText('Two icons').waitFor({ timeout: 4000 });
      loaded = true;
    } catch {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  check(loaded, 'the example app loads in a browser');
  if (loaded) {
    await page.waitForTimeout(2500);
    const canvases = await page.locator('canvas').count();
    check(canvases >= 8, `Skia canvases are drawn (${canvases})`);
    await page.screenshot({ path: join(out, 'two-icons.png') });
    await page.getByText('Grid of 30', { exact: true }).click();
    await page.waitForTimeout(2500);
    if (errors.length) console.log(`page errors: ${errors.slice(0, 3).join(' | ').slice(0, 600)}`);
    await page.screenshot({ path: join(out, 'grid-before.png') });
    await page.getByText('Loop all', { exact: true }).click({ timeout: 8000 });
    await page.waitForTimeout(700);
    const first = await page.locator('canvas').first().screenshot();
    await page.waitForTimeout(350);
    const second = await page.locator('canvas').first().screenshot();
    check(!first.equals(second), 'an icon changes between two moments of its gesture');
    await page.screenshot({ path: join(out, 'grid.png') });
    check(errors.length === 0, `no error in the page${errors.length ? `: ${errors.slice(0, 2).join(' | ')}` : ''}`);
  }
} finally {
  await browser.close();
  stop();
}
console.log(`Screenshots in ${out}`);
process.exit(failed ? 1 : 0);
