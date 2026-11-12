/**
 * Looks at the built site in Chromium: every page loads without an error, the search filters,
 * the palette recolours the icons, a hovered tile plays its gesture. Screenshots of each page,
 * wide and narrow, go to out/site/.
 *
 *   pnpm site:build && node tools/site-check.ts
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';
import { ROOT } from './lib/icons.ts';
import { serve } from './serve.ts';

const PORT = 4322;
const origin = `http://localhost:${PORT}/triolet`;
const out = join(ROOT, 'out/site');
mkdirSync(out, { recursive: true });

const server = await serve(join(ROOT, 'site/dist'), PORT, '/triolet');

let failed = 0;
const check = (ok: boolean, message: string) => {
  if (!ok) failed++;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${message}`);
};

const browser = await chromium.launch();
try {
  const errors: string[] = [];
  const pages = { home: '/', icons: '/icons/', icon: '/icons/bell-ring/', docs: '/docs/' };
  for (const [width, label] of [
    [1280, 'wide'],
    [390, 'narrow'],
  ] as const) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    for (const [name, path] of Object.entries(pages)) {
      const response = await page.goto(origin + path);
      check(response?.status() === 200, `${label} ${path} loads`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(overflow <= 1, `${label} ${path} has no sideways scroll (${overflow}px)`);
      await page.screenshot({ path: join(out, `${name}-${label}.png`), fullPage: true });
    }
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${origin}/icons/`);
  const total = await page.locator('.tile').count();
  await page.fill('#q', 'bell');
  const shown = await page.locator('.tile:not([hidden])').count();
  check(shown >= 1 && shown < total, `search "bell" keeps ${shown} of ${total} icons`);
  await page.fill('#q', 'zzzz');
  check(await page.locator('#empty').isVisible(), 'a search with no match says so');
  await page.fill('#q', '');
  await page.hover('.tile >> nth=3');
  const playing = await page.evaluate(() => document.querySelectorAll('.tile')[3]!.getAnimations({ subtree: true }).length);
  check(playing > 0, `a hovered tile plays its gesture (${playing} animations)`);
  await page.mouse.move(0, 0);
  const before = await page.evaluate(() => getComputedStyle(document.querySelector('.tile svg [fill*="--tri-main"]')!).fill);
  check(!(await page.locator('.preset >> text=Forest').isVisible()), 'the colours are folded away until asked for');
  await page.click('.colours summary');
  await page.click('.preset >> text=Forest');
  const after = await page.evaluate(() => getComputedStyle(document.querySelector('.tile svg [fill*="--tri-main"]')!).fill);
  check(before !== after, `the Forest palette recolours the icons (${before} to ${after})`);
  await page.reload();
  const kept = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--triolet-main').trim());
  check(kept.toLowerCase() === '#1f5a3d', `the palette is remembered after a reload (${kept})`);
  await page.click('.colours summary');
  await page.click('.preset >> text=Night');
  await page.screenshot({ path: join(out, 'icons-night.png') });
  check((await page.evaluate(() => document.documentElement.dataset.surface)) === 'dark', 'the Night palette switches the page to a dark surface');
  // The play button of an icon page starts the gesture again every time, hovered or not.
  await page.goto(`${origin}/icons/bell-ring/`);
  await page.evaluate(() => {
    const svg = document.querySelector('.shown')!;
    (window as any).__starts = 0;
    svg.addEventListener('animationstart', () => (window as any).__starts++);
  });
  for (let i = 0; i < 3; i++) {
    await page.click('[data-play]');
    await page.waitForTimeout(2200);
  }
  const starts = await page.evaluate(() => (window as any).__starts as number);
  check(starts >= 6, `the play button restarts the gesture on every press (${starts} animation starts in 3 presses)`);
  check(errors.length === 0, `no error in the console${errors.length ? `: ${errors.slice(0, 3).join(' | ')}` : ''}`);
} finally {
  await browser.close();
  server.close();
}
console.log(`Screenshots in ${out}`);
if (failed) process.exit(1);
