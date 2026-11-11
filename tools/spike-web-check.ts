/**
 * Runs the web spike in Chromium, Firefox and WebKit (Playwright) and checks, in each engine,
 * what a person would check by hand:
 *   - the page's own results table (variables in filters, color-mix, individual transforms);
 *   - the relief is really PAINTED from a custom property (a pixel of the shadow changes
 *     colour when --triolet-shade changes), not only computed;
 *   - hover, keyboard focus of a parent and the play class start the gesture;
 *   - nothing starts under prefers-reduced-motion: reduce.
 * Screenshots go to out/spike-web/.
 *
 *   node tools/spike-web.ts && node tools/spike-web-check.ts
 *
 * WebKit here is Playwright's build of the engine, not Safari itself.
 */
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium, firefox, webkit, type BrowserType, type Page } from 'playwright';
import { ROOT } from './lib/icons.ts';

const url = pathToFileURL(join(ROOT, 'spikes/web/index.html')).href;
const out = join(ROOT, 'out/spike-web');
mkdirSync(out, { recursive: true });

type Check = [question: string, answer: string, ok: boolean | null];

/** Colour of one screen pixel, from a 1 × 1 screenshot. */
async function pixel(page: Page, x: number, y: number): Promise<[number, number, number]> {
  const png = await page.screenshot({ clip: { x, y, width: 1, height: 1 } });
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]] as [number, number, number];
  }, png.toString('base64'));
}

const running = (page: Page, selector: string) =>
  page.evaluate(
    (sel) =>
      document
        .querySelector(sel)!
        .getAnimations({ subtree: true })
        .map((a) => (a as CSSAnimation).animationName),
    selector,
  );

async function run(name: string, type: BrowserType): Promise<Check[]> {
  const checks: Check[] = [];
  const browser = await type.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(url);

    for (const row of await page.locator('#results tr').all()) {
      const cells = await row.locator('th, td').allInnerTexts();
      const verdict = cells[2]?.trim();
      checks.push([cells[0]!, cells[1]!, verdict === 'OK' ? true : verdict === 'FAIL' ? false : null]);
    }

    // The relief is painted from the custom property: a point 1.6 units under the calendar,
    // where the shadow is at about half its strength.
    const agenda = page.locator('#motion .triolet-agenda');
    const box = (await agenda.boundingBox())!;
    const unit = box.width / 96;
    const at = { x: Math.round(box.x + 40 * unit), y: Math.round(box.y + 79.6 * unit) };
    const before = await pixel(page, at.x, at.y);
    await page.evaluate(() => document.documentElement.style.setProperty('--triolet-shade', 'rgb(255 0 0)'));
    const red = await pixel(page, at.x, at.y);
    await page.evaluate(() => document.documentElement.style.removeProperty('--triolet-shade'));
    // Engines snap the icon to pixels differently at 1x, so the same point is more or less deep in the shadow.
    const isShadow = before[0] < 248 && Math.abs(before[0] - before[2]) < 40;
    const isRed = red[0] - red[1] > 40 && red[0] - red[2] > 40;
    checks.push(['Relief shadow is painted (pixel under the calendar)', `rgb(${before.join(', ')})`, isShadow]);
    checks.push(['The shadow repaints when --triolet-shade changes', `rgb(${red.join(', ')}) with a red shade`, isRed]);

    // A derived tint follows --triolet-main.
    const dot = { x: Math.round(box.x + 27 * unit), y: Math.round(box.y + 49 * unit) };
    const tintBefore = await pixel(page, dot.x, dot.y);
    await page.evaluate(() => document.documentElement.style.setProperty('--triolet-main', '#00AA00'));
    const tintAfter = await pixel(page, dot.x, dot.y);
    await page.evaluate(() => document.documentElement.style.removeProperty('--triolet-main'));
    checks.push([
      'A derived tint follows --triolet-main (color-mix)',
      `rgb(${tintBefore.join(', ')}) then rgb(${tintAfter.join(', ')})`,
      tintAfter[1] > tintAfter[0] + 8 && tintAfter[1] > tintAfter[2] + 8,
    ]);

    // Hover.
    const bell = '#motion .triolet-alertes';
    checks.push(['At rest nothing is animating', String((await running(page, 'body')).length), (await running(page, 'body')).length === 0]);
    await page.hover(bell);
    const hovered = await running(page, bell);
    checks.push(['Hover starts the gesture', hovered.join(', ') || 'nothing', hovered.length === 3]);
    await page.mouse.move(2, 2);

    // Keyboard focus of a parent.
    await page.locator('#play').focus();
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => {
      const el = document.activeElement!;
      return { trigger: el.classList.contains('triolet-trigger'), visible: el.matches(':focus-visible'), anims: el.getAnimations({ subtree: true }).length };
    });
    checks.push(['Tab to a trigger button plays its icon', JSON.stringify(focused), focused.trigger && focused.visible && focused.anims > 0]);
    await page.evaluate(() => (document.activeElement as HTMLElement).blur());

    // The play class.
    await page.click('#play');
    const played = await running(page, '#motion');
    checks.push(['The play class starts every gesture', `${played.length} animations in the first row`, played.length >= 12]);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(2200);
    await page.screenshot({ path: join(out, `${name}.png`), fullPage: true });
    await page.locator('#motion').screenshot({ path: join(out, `${name}-icons.png`) });
    checks.push(['Page errors', errors.join(' | ') || 'none', errors.length === 0]);

    // Reduced motion.
    const calm = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await calm.goto(url);
    await calm.hover(bell);
    await calm.click('#play');
    const moved = await running(calm, 'body');
    checks.push(['Reduced motion: hover and play start nothing', `${moved.length} animations`, moved.length === 0]);
  } finally {
    await browser.close();
  }
  return checks;
}

const engines: [string, BrowserType][] = [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
];
const wanted = process.argv.slice(2);
let failed = 0;
for (const [name, type] of engines) {
  if (wanted.length && !wanted.includes(name)) continue;
  console.log(`\n== ${name} ==`);
  try {
    for (const [question, answer, ok] of await run(name, type)) {
      if (ok === false) failed++;
      console.log(`${ok === null ? '    ' : ok ? 'OK  ' : 'FAIL'} ${question}: ${answer}`);
    }
  } catch (error) {
    failed++;
    console.log(`FAIL could not run: ${(error as Error).message.split('\n')[0]}`);
  }
}
console.log(`\nScreenshots in ${out}`);
if (failed) process.exit(1);
