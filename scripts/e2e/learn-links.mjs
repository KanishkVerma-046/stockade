// Browser checks for the tool pages' learn links. Not part of `npm test`.
//
//   npm run build && npx astro preview        (in another terminal)
//   node scripts/e2e/learn-links.mjs [--base http://localhost:4321] [--shots <dir>]
//
// Checks, in every locale: no horizontal overflow on the four tool pages at
// 320/360/375px (the simulator's Order tab too); each lower-pane label (VOL,
// RSI, MACD) carries its learn link on both charts; and every learn link opens
// a new tab. On /simulator/ and /es/simulator/: B, S and F trade in live and
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
