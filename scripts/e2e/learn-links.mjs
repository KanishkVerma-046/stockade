// Browser checks for the tool pages' learn links. Not part of `npm test`.
//
//   npm run build && npx astro preview        (in another terminal)
//   node scripts/e2e/learn-links.mjs [--base http://localhost:4321] [--shots <dir>]
//
// Checks, in every locale: no horizontal overflow on the four tool pages at
// 320/360/375px (the simulator's Order tab too); each lower-pane label (VOL,
// RSI, MACD) carries its learn link on both charts; and every learn link opens
// a new tab; no learn link is covered by another element. Both charts' symbol
// overlays are drawn on top, cover no candle or marker, let the pointer through,
// stay clear of the indicator toggles and agree with the price panel / toolbar
// ("—" before mount, "· 1M" in replay only) at 320/360/375/1280px.
// On /simulator/ and /es/simulator/: B, S and F trade in live and
// replay mode with nothing focused, with a learn link focused, and right after
// a learn link was clicked. Fails on any console error or uncaught exception
// (hydration mismatches surface as React errors there). With --shots, saves
// screenshots of the simulator and chart simulator at 375px and 1280px.

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const arg = name => {
  const i = process.argv.indexOf(name);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const BASE = (arg('--base') ?? 'http://localhost:4321').replace(/\/$/, '');
const SHOTS = arg('--shots');
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const LOCALES = ['en', 'es', 'pt', 'ja', 'fr', 'de', 'ko', 'it'];
const TOOLS = ['simulator', 'chart-simulator', 'markets', 'analytics'];
const prefix = l => (l === 'en' ? '' : `/${l}`);
const LEARN = 'a[target="_blank"][rel="noopener"][aria-label]';
// The simulator's Chart / Order / Trades tab bar below lg, and its desktop side panels.
const MOBILE_TABS = 'div.lg\\:hidden.border-b > button';
const LEFT_PANEL = 'div.w-\\[180px\\]';
const RIGHT_PANEL = 'div.w-\\[220px\\]';

const failures = [];
const fail = msg => { failures.push(msg); console.log(`  FAIL ${msg}`); };
const ok = msg => console.log(`  ok   ${msg}`);

const browser = await chromium.launch();

async function open(path, width, height = 800) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  const errors = [];
  // Third-party frames (the ad iframe's report-only CSP notices) are not ours.
  page.on('console', m => {
    const from = m.location().url;
    if (m.type() !== 'error' || /report-only Content Security Policy/.test(m.text())) return;
    if (from && !from.startsWith(BASE)) return;
    errors.push(m.text());
  });
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  return { context, page, errors };
}

async function close({ context, errors }, label) {
  if (errors.length) fail(`${label}: console errors: ${errors.join(' | ')}`);
  await context.close();
}

async function noOverflow(page, label) {
  const { sw, cw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  if (sw > cw) fail(`${label}: horizontal overflow (${sw} > ${cw})`);
}

// ── Overflow ────────────────────────────────────────────────────────────────
console.log('Overflow at 320/360/375px');
for (const l of LOCALES) {
  for (const tool of TOOLS) {
    for (const w of [320, 360, 375]) {
      const s = await open(`${prefix(l)}/${tool}/`, w);
      const label = `${l} /${tool}/ @${w}`;
      await noOverflow(s.page, label);
      if (tool === 'simulator') {
        // The Order tab is the third mobile panel; its learn links live there.
        await s.page.locator(MOBILE_TABS).nth(1).click();
        await noOverflow(s.page, `${label} Order tab`);
      }
      await close(s, label);
    }
  }
  ok(`${l}: checked`);
}

// ── Pane labels and link attributes ─────────────────────────────────────────
console.log('Lower-pane labels');
for (const l of LOCALES) {
  for (const tool of ['simulator', 'chart-simulator']) {
    const s = await open(`${prefix(l)}/${tool}/`, 1280);
    const label = `${l} /${tool}/`;
    for (const ind of ['vol', 'rsi', 'macd']) {
      await s.page.locator('button', { hasText: new RegExp(`^${ind}$`, 'i') }).first().click();
      const pane = s.page.locator('div.absolute.left-2', { has: s.page.locator(LEARN) });
      const count = await pane.count();
      if (count !== 1) { fail(`${label} ${ind}: ${count} pane labels`); continue; }
      const href = await pane.locator('a').getAttribute('href');
      if (!href.startsWith(`${prefix(l)}/blog/`) || !href.endsWith('/')) fail(`${label} ${ind}: bad href ${href}`);
    }
    const links = await s.page.locator('a[aria-label]').evaluateAll(as => as
      .filter(a => a.querySelector('span[aria-hidden="true"]')?.textContent === '?')
      .map(a => ({ target: a.target, rel: a.rel, inButton: !!a.closest('button') })));
    for (const a of links) {
      if (a.target !== '_blank' || a.rel !== 'noopener') fail(`${label}: learn link without target/rel`);
      if (a.inButton) fail(`${label}: learn link inside a button`);
    }
    await close(s, label);
  }
  ok(`${l}: VOL, RSI and MACD labels link to ${l} posts`);
}

// ── Reachability ────────────────────────────────────────────────────────────
// Every learn link that is laid out must be the topmost element at its centre:
// one painted under a chart canvas is focusable but invisible.
console.log('Learn links not covered');
for (const l of LOCALES) {
  for (const tool of TOOLS) {
    for (const w of [375, 1280]) {
      const s = await open(`${prefix(l)}/${tool}/`, w);
      const label = `${l} /${tool}/ @${w}`;
      const covered = await s.page.locator(LEARN).evaluateAll(as => as.flatMap(a => {
        const r = a.getBoundingClientRect();
        if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight) return [];
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return hit && (hit === a || a.contains(hit) || hit.closest('[class*="cookie"], [role="dialog"]')) ? [] : [a.getAttribute('href')];
      }));
      if (covered.length) fail(`${label}: covered learn links ${covered.join(', ')}`);
      await close(s, label);
    }
  }
  ok(`${l}: checked`);
}

// ── Chart overlays ──────────────────────────────────────────────────────────
// The symbol box over each chart's top-left corner: drawn above the canvas,
// clear of candles and markers and of the simulator's indicator toggles,
// transparent to the crosshair except for its learn link, and accurate.
const OVERLAY = '[data-chart-overlay]';

// In-page: is the box on top, which candle-coloured canvas pixels lie under
// it, does it pass the pointer through, and does it stay clear of the toggles?
async function overlayGeometry(page) {
  return page.locator(OVERLAY).evaluate(box => {
    const r = box.getBoundingClientRect();
    const root = box.parentElement;
    const cx = r.x + r.width / 2, cy = r.y + r.height / 2;
    box.style.pointerEvents = 'auto';
    const onTop = box.contains(document.elementFromPoint(cx, cy));
    box.style.pointerEvents = '';
    const through = document.elementFromPoint(r.x + 4, r.y + r.height - 4);
    const passes = !box.contains(through);
    let candlePixels = 0;
    for (const c of root.querySelectorAll('canvas')) {
      const cr = c.getBoundingClientRect();
      const x0 = Math.max(r.left, cr.left), x1 = Math.min(r.right, cr.right);
      const y0 = Math.max(r.top, cr.top), y1 = Math.min(r.bottom, cr.bottom);
      if (x1 <= x0 || y1 <= y0 || !cr.width) continue;
      const k = c.width / cr.width;
      const data = c.getContext('2d').getImageData((x0 - cr.left) * k, (y0 - cr.top) * k, (x1 - x0) * k, (y1 - y0) * k).data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 128) continue;
        const near = (r2, g2, b2) => Math.abs(data[i] - r2) + Math.abs(data[i + 1] - g2) + Math.abs(data[i + 2] - b2) < 60;
        if (near(34, 197, 94) || near(239, 68, 68)) candlePixels++;
      }
    }
    // The simulator's indicator toggles: each row, not their wider wrapper.
    const rows = [...(root.querySelector('[class*="right-[68px]"]')?.children ?? [])].map(row => row.getBoundingClientRect());
    const hitsToggles = rows.some(t => !(r.right <= t.left || r.left >= t.right || r.bottom <= t.top || r.top >= t.bottom));
    const rootR = root.getBoundingClientRect();
    const inside = r.left >= rootR.left && r.right <= rootR.right && r.bottom <= rootR.bottom;
    return { onTop, passes, candlePixels, hitsToggles, inside, text: box.innerText.replace(/\s+/g, ' ').trim() };
  });
}

function checkGeometry(g, label) {
  if (!g.onTop) fail(`${label}: overlay is painted under the chart`);
  if (!g.passes) fail(`${label}: overlay blocks the pointer`);
  if (g.candlePixels) fail(`${label}: overlay covers ${g.candlePixels} candle/marker pixels`);
  if (g.hitsToggles) fail(`${label}: overlay overlaps the indicator toggles`);
  if (!g.inside) fail(`${label}: overlay spills out of the chart`);
}

// Before mount the simulator's box shows "—" for symbol, price and change.
console.log('Chart overlays');
for (const l of LOCALES) {
  const html = await (await fetch(`${BASE}${prefix(l)}/simulator/`)).text();
  const m = html.match(/data-chart-overlay[^>]*>([\s\S]*?)<\/div><\/div><\/div><\/div>/);
  const text = m ? m[1].replace(/<a [\s\S]*?<\/a>/g, '').replace(/<[^>]+>/g, '|').split('|').map(s => s.trim()).filter(Boolean) : [];
  if (text.join(' ') !== '— — —') fail(`${l}: static simulator overlay reads "${text.join(' ')}"`);
}
ok('static simulator overlays show — — — in every locale');

for (const l of LOCALES) {
  for (const w of [320, 360, 375, 1280]) {
    // Simulator, live then replay; the box must agree with the price panel.
    const s = await open(`${prefix(l)}/simulator/`, w);
    const { page } = s;
    const label = `${l} /simulator/ @${w}`;
    await page.waitForFunction(() => !document.querySelector('[data-chart-overlay]')?.innerText.includes('—'));
    await page.waitForTimeout(400);
    for (const mode of ['live', 'replay']) {
      if (mode === 'replay') {
        await page.locator('button', { hasText: 'REPLAY' }).click();
        await page.waitForTimeout(400);
      }
      checkGeometry(await overlayGeometry(page), `${label} ${mode}`);
      // Read in one go so a tick can't land between the two. The panel's change
      // line is "0.8575 (-0.46%)"; the box shows only the percentage.
      const { box, panel } = await page.evaluate(() => {
        const rows = document.querySelector('[data-chart-overlay]').firstElementChild.children;
        const p = document.querySelector('.text-\\[26px\\]').parentElement.children;
        return {
          box: [rows[0].firstElementChild.textContent, rows[1].children[0].textContent, rows[1].children[1].textContent],
          panel: [p[0].textContent, p[1].textContent, (p[2].textContent.match(/\(([^)]+)\)/) ?? [])[1]],
        };
      });
      const wantSym = mode === 'replay' ? 'APXL · 1M' : 'APXL';
      if (box[0] !== wantSym) fail(`${label} ${mode}: overlay symbol "${box[0]}"`);
      if (!/^\$[\d.,]+$/.test(box[1]) || !/^[+-]\d+\.\d\d%$/.test(box[2])) fail(`${label} ${mode}: overlay reads "${box.join(' ')}"`);
      if (box.join(' ') !== panel.join(' ')) fail(`${label} ${mode}: overlay "${box.join(' ')}" disagrees with panel "${panel.join(' ')}"`);
    }
    if (w < 1024) {
      // Hiding the chart (Order tab) and showing it again must not throw or move the box.
      await page.locator(MOBILE_TABS).nth(1).click();
      await page.waitForTimeout(300);
      await page.locator(MOBILE_TABS).nth(0).click();
      await page.waitForTimeout(400);
      checkGeometry(await overlayGeometry(page), `${label} after Order tab`);
    }
    await close(s, label);

    // Chart simulator: symbol and timeframe follow the toolbar.
    const c = await open(`${prefix(l)}/chart-simulator/`, w);
    const clabel = `${l} /chart-simulator/ @${w}`;
    await c.page.waitForFunction(() => /%$/.test(document.querySelector('[data-chart-overlay]')?.innerText.trim() ?? ''));
    await c.page.waitForTimeout(400);
    const g = await overlayGeometry(c.page);
    checkGeometry(g, clabel);
    const sym = (await c.page.locator('div.relative.shrink-0 > button').first().innerText()).trim();
    if (!new RegExp(`^${sym.replace(/[/]/g, '\\/')} · 1D · [+-]?\\d+\\.\\d\\d%$`).test(g.text)) fail(`${clabel}: overlay reads "${g.text}" for ${sym} 1D`);
    await c.page.locator('button', { hasText: /^1H$/ }).click();
    await c.page.waitForTimeout(400);
    const g1h = await overlayGeometry(c.page);
    checkGeometry(g1h, `${clabel} 1H`);
    if (!g1h.text.includes(' · 1H · ')) fail(`${clabel}: overlay reads "${g1h.text}" after 1H`);
    await close(c, clabel);
  }
  ok(`${l}: overlays checked at 320/360/375/1280`);
}

// Hovering a candle under the box still moves the crosshair readout.
{
  const s = await open('/chart-simulator/', 1280);
  await s.page.waitForFunction(() => /%$/.test(document.querySelector('[data-chart-overlay]')?.innerText.trim() ?? ''));
  const status = () => s.page.locator('div.h-8.border-t').innerText();
  const idle = await status();
  const r = await s.page.locator(OVERLAY).boundingBox();
  await s.page.mouse.move(r.x + 6, r.y + r.height - 4);
  await s.page.waitForTimeout(200);
  if ((await status()) === idle) fail('chart-simulator: hover under the overlay did not update the OHLCV readout');
  else ok('chart-simulator: hover under the overlay updates the OHLCV readout');
  await close(s, 'chart-simulator hover');
}

// ── Keyboard ────────────────────────────────────────────────────────────────
// The position is read from the desktop left panel's card ("LONG 100").
async function side(page) {
  const text = await page.locator(LEFT_PANEL).innerText();
  return /\bLONG \d/.test(text) ? 'long' : /\bSHORT \d/.test(text) ? 'short' : 'flat';
}

async function expectSide(page, want, label) {
  await page.waitForTimeout(150);
  const got = await side(page);
  if (got !== want) fail(`${label}: expected ${want}, got ${got}`);
}

async function cycle(page, label) {
  // From flat: B opens a long, F flattens, S opens a short, F flattens.
  await page.keyboard.press('b'); await expectSide(page, 'long', `${label} B`);
  await page.keyboard.press('f'); await expectSide(page, 'flat', `${label} F`);
  await page.keyboard.press('s'); await expectSide(page, 'short', `${label} S`);
  await page.keyboard.press('f'); await expectSide(page, 'flat', `${label} F`);
}

console.log('Keyboard shortcuts');
for (const l of ['en', 'es']) {
  for (const mode of ['live', 'replay']) {
    const s = await open(`${prefix(l)}/simulator/`, 1280);
    const { page, context } = s;
    const label = `${l} ${mode}`;
    await page.waitForFunction(() => !document.querySelector('.text-\\[20px\\]')?.textContent?.includes('—'));
    if (mode === 'replay') await page.locator('button', { hasText: 'REPLAY' }).click();
    const startUrl = page.url();

    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await cycle(page, `${label}, nothing focused`);

    // A learn link in the desktop order panel, focused from the keyboard's point of view.
    const link = page.locator(`${RIGHT_PANEL} ${LEARN}`).first();
    await link.focus();
    await cycle(page, `${label}, learn link focused`);
    const stillFocused = await link.evaluate(a => document.activeElement === a);
    if (!stillFocused) fail(`${label}: learn link lost focus to a shortcut`);
    if (context.pages().length !== 1) fail(`${label}: a shortcut opened a tab from the focused link`);

    // Click it: it opens a new tab and leaves this one where it was.
    const [popup] = await Promise.all([context.waitForEvent('page'), link.click()]);
    await popup.waitForLoadState();
    if (!popup.url().includes('/blog/')) fail(`${label}: link opened ${popup.url()}`);
    await popup.close();
    if (page.url() !== startUrl) fail(`${label}: simulator tab navigated to ${page.url()}`);
    await cycle(page, `${label}, learn link just clicked`);

    await close(s, label);
    ok(`${label}: B/S/F checked`);
  }
}

// ── Screenshots ─────────────────────────────────────────────────────────────
if (SHOTS) {
  console.log(`Screenshots in ${SHOTS}`);
  for (const w of [375, 1280]) {
    for (const tool of ['simulator', 'chart-simulator']) {
      const s = await open(`/${tool}/`, w, w === 375 ? 812 : 800);
      await s.page.waitForTimeout(500);
      await s.page.screenshot({ path: join(SHOTS, `${tool}-${w}.png`) });
      if (tool === 'simulator') {
        await s.page.locator('button', { hasText: 'REPLAY' }).click();
        await s.page.waitForTimeout(500);
        await s.page.screenshot({ path: join(SHOTS, `${tool}-${w}-replay.png`) });
      }
      if (tool === 'simulator' && w === 375) {
        await s.page.locator(MOBILE_TABS).nth(1).click();
        await s.page.waitForTimeout(300); // the tab underline transitions
        await s.page.screenshot({ path: join(SHOTS, `simulator-${w}-order.png`) });
      }
      for (const ind of ['rsi', 'macd']) {
        if (w !== 1280) continue;
        await s.page.locator('button', { hasText: new RegExp(`^${ind}$`, 'i') }).first().click();
        await s.page.waitForTimeout(200);
        await s.page.screenshot({ path: join(SHOTS, `${tool}-${w}-${ind}.png`) });
      }
      await close(s, `shot ${tool} @${w}`);
    }
    for (const tool of ['markets', 'analytics']) {
      const s = await open(`/${tool}/`, w);
      await s.page.screenshot({ path: join(SHOTS, `${tool}-${w}.png`) });
      await close(s, `shot ${tool} @${w}`);
    }
  }
}

await browser.close();
console.log(failures.length ? `\n${failures.length} failure(s)` : '\nAll checks passed');
process.exit(failures.length ? 1 : 0);
