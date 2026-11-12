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

const PORT = 8097;
const out = join(ROOT, 'out/native');
mkdirSync(out, { recursive: true });

const server = spawn(`npx expo start --web --port ${PORT}`, { cwd: join(ROOT, 'examples/expo'), shell: true, stdio: 'ignore', env: { ...process.env, CI: '1' } });
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
    await page.getByText('Grid of 30').click();
    await page.waitForTimeout(1500);
    await page.getByText('Loop all').click();
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
