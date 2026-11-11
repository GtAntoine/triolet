/**
 * The built packages, used the way a user would: as strings in Node, rendered by React on a
 * server, and in a real page (Chromium, through Playwright).
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { chromium, type Browser, type Page } from 'playwright';
import { ROOT } from '../lib/icons.ts';
import { serve } from '../serve.ts';

const load = (path: string) => import(pathToFileURL(join(ROOT, path)).href);

let browser: Browser;
let page: Page;
let server: Awaited<ReturnType<typeof serve>>;
const PORT = 4179;

before(async () => {
  execFileSync(process.execPath, [join(ROOT, 'tools/build-packages.ts')], { cwd: ROOT, stdio: 'pipe' });
  server = await serve(join(ROOT, 'packages/triolet'), PORT);
  browser = await chromium.launch();
  page = await browser.newPage();
  // Any address of the server gives the page its origin; the content is set by each test.
  await page.goto(`http://localhost:${PORT}/dist/triolet.css`);
});

after(async () => {
  await browser?.close();
  server?.close();
});

test('triolet: an icon as a string, with the CSS a page needs', async () => {
  const { toSvg, styles, styleTag, calendarClock: agenda, ballotBox: voter } = await load('packages/triolet/dist/triolet/src/index.js');
  const svg = toSvg(agenda, { size: 32, label: 'Agenda', colors: { main: '#5B2A6E' } });
  assert.match(svg, /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 96 96" width="32" height="32" class="triolet triolet-calendar-clock" data-tier="compact"/);
  assert.match(svg, /style="--triolet-main:#5B2A6E"/);
  assert.match(svg, /role="img" aria-label="Agenda"/);
  assert.match(toSvg(agenda, { size: 16 }), /data-tier="flat"/);
  assert.doesNotMatch(toSvg(agenda, { size: 16 }), /<filter/);
  assert.match(toSvg(agenda, { finish: 'flat', size: 96 }), /data-tier="flat"/);
  assert.match(toSvg(agenda, { trigger: 'manual' }), /data-trigger="manual"/);
  const css = styles([agenda, voter]);
  assert.match(css, /@keyframes tri-calendar-clock-hour-hand/);
  assert.match(css, /@keyframes tri-ballot-box-ballot/);
  assert.match(styleTag([agenda]), /^<style id="triolet-styles" data-icons="calendar-clock">/);
});

test('triolet: shared filters are ignored for an icon with its own colours', async () => {
  const { toSvg, ballotBox: voter } = await load('packages/triolet/dist/triolet/src/index.js');
  assert.match(toSvg(voter, { filters: 'shared' }), /filter="url\(#tri-r\)"/);
  assert.doesNotMatch(toSvg(voter, { filters: 'shared' }), /<filter/);
  assert.match(toSvg(voter, { filters: 'shared', colors: { base: '#EEF2EA' }, uid: 'x' }), /<filter id="tri-r-x"/);
});

test('triolet: createIcons replaces placeholders, in a real page', async () => {
  await page.setContent(`
    <button class="triolet-trigger keep"><i data-triolet="calendar-clock" data-size="40" class="mine"></i> Agenda</button>
    <i data-triolet="voter" data-label="Vote" data-main="#5B2A6E"></i>
    <i data-triolet="bell-ring" data-filters="shared"></i>
    <i data-triolet="missing"></i>
    <script type="module">
      import { createIcons, play, calendarClock, ballotBox, bellRing } from '/dist/triolet/src/index.js';
      window.created = createIcons({ icons: { calendarClock, ballotBox, bellRing } }).length;
      window.play = play;
    </script>`);
  await page.waitForFunction(() => 'created' in window);
  const state = await page.evaluate(() => ({
    created: (window as unknown as { created: number }).created,
    left: document.querySelectorAll('i[data-triolet]').length,
    agenda: document.querySelector('.triolet-calendar-clock')!.getAttribute('class'),
    width: document.querySelector('.triolet-calendar-clock')!.getAttribute('width'),
    label: document.querySelector('.triolet-ballot-box')!.getAttribute('aria-label'),
    voterMain: getComputedStyle(document.querySelector('.triolet-ballot-box g > rect')!).fill,
    styleIcons: (document.getElementById('triolet-styles') as HTMLStyleElement).dataset.icons,
    sharedDefs: document.querySelectorAll('#triolet-defs filter').length,
    alertesOwnFilters: document.querySelectorAll('.triolet-bell-ring filter').length,
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
  }));
  assert.equal(state.created, 3);
  assert.equal(state.left, 1, 'the unknown placeholder stays');
  assert.equal(state.agenda, 'triolet triolet-calendar-clock mine');
  assert.equal(state.width, '40');
  assert.equal(state.label, 'Vote');
  assert.equal(state.voterMain, 'rgb(91, 42, 110)');
  assert.equal(state.styleIcons, 'calendar-clock ballot-box bell-ring');
  assert.equal(state.sharedDefs, 7);
  assert.equal(state.alertesOwnFilters, 0);
  assert.equal(new Set(state.ids).size, state.ids.length, 'every id in the page is unique');
});

test('triolet: hover, a focused trigger and play() run the gesture; play() resolves when it is over', async () => {
  const names = (selector: string) =>
    page.evaluate((sel) => document.querySelector(sel)!.getAnimations({ subtree: true }).map((a) => (a as CSSAnimation).animationName), selector);
  assert.deepEqual(await names('body'), []);
  await page.hover('.triolet-ballot-box');
  assert.deepEqual(await names('.triolet-ballot-box'), ['tri-ballot-box-ballot']);
  await page.mouse.move(0, 0);
  await page.keyboard.press('Tab');
  assert.deepEqual((await names('.triolet-calendar-clock')).sort(), ['tri-calendar-clock-hour-hand', 'tri-calendar-clock-minute-hand']);
  await page.evaluate(() => (document.activeElement as HTMLElement).blur());
  const played = await page.evaluate(async () => {
    const svg = document.querySelector('.triolet-bell-ring')!;
    const started = performance.now();
    const done = (window as unknown as { play: (el: Element) => Promise<void> }).play(svg);
    const during = svg.classList.contains('triolet-play') && svg.getAnimations({ subtree: true }).length;
    await done;
    return { during, after: svg.classList.contains('triolet-play'), ms: performance.now() - started };
  });
  assert.equal(played.during, 3);
  assert.equal(played.after, false, 'the class leaves so that hover works again');
  assert.ok(played.ms > 700 && played.ms < 1500, `the bell rings for 0.8 s (took ${Math.round(played.ms)} ms)`);
});

test('triolet-react: a component renders on a server with its styles', async () => {
  const { CalendarClock: Agenda, BallotBox: Voter, TrioletProvider } = await load('packages/triolet-react/dist/index.js');
  const { createElement } = await load('packages/triolet-react/node_modules/react/index.js');
  const { renderToString } = await load('packages/triolet-react/node_modules/react-dom/server.js');
  const html: string = renderToString(
    createElement(
      'div',
      null,
      createElement(Agenda, { size: 32, label: 'Agenda', className: 'mine', 'data-testid': 'a' }),
      createElement(Agenda, { main: '#5B2A6E' }),
      createElement(TrioletProvider, { colors: { accent: '#E8A13A' }, finish: 'flat', size: 20 }, createElement(Voter, null)),
    ),
  );
  const tags = [...html.matchAll(/<svg [^>]*>/g)].map((m) => m[0]);
  assert.equal(tags.length, 3);
  for (const part of ['data-testid="a"', 'width="32" height="32"', 'class="triolet triolet-calendar-clock mine"', 'data-tier="compact"', 'role="img" aria-label="Agenda"']) {
    assert.ok(tags[0]!.includes(part), `first icon has ${part}`);
  }
  assert.ok(tags[1]!.includes('style="--triolet-main:#5B2A6E"') && tags[1]!.includes('aria-hidden="true"'));
  assert.match(html, /<span style="display:contents;--triolet-accent:#E8A13A">/);
  assert.ok(tags[2]!.includes('width="20" height="20"') && tags[2]!.includes('data-tier="flat"'), 'the provider gives size and finish');
  // React 19 emits each sheet once, however many icons use it, and hoists them out of the tree.
  assert.match(html, /^<style data-precedence="triolet" data-href="triolet-base triolet-calendar-clock triolet-ballot-box">/);
  assert.equal(html.match(/@keyframes tri-calendar-clock-hour-hand/g)?.length, 1);
  const ids = [...html.matchAll(/<filter id="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, 4, 'one compact relief, then three full ones');
  assert.equal(new Set(ids).size, ids.length, 'two instances of an icon do not share filter ids');
});
