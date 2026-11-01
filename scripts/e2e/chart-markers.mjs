// Browser check for the chart simulator's pattern markers. Not part of `npm test`.
//
//   npm run build && npx astro preview        (in another terminal)
//   node scripts/e2e/chart-markers.mjs [--base http://localhost:4321] [--locales en,ja] [--shots <dir>]
//
// For each locale, at 375px and 1280px, steps a 1D session from its first
// revealed candle to the end with → and reads the marker counts the chart
// writes on its container (data-markers, data-marker-labels; canvas text can't
// be read). Below 640px of chart width at most one marker carries text, and
// the selected pattern's latest marker does once a reveal selects one; at
// 1280px every marker is labelled while nothing is selected, as before. Fails
// on any console error. With --shots, saves the chart at the start, midway and
// at the end. Against a build without the counts (production before this
// change) it only takes the screenshots.

import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const BASE = (arg('--base') ?? 'http://localhost:4321').replace(/\/$/, '');
const LOCALES = (arg('--locales') ?? 'en,ja').split(',');
const SHOTS = arg('--shots');
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const prefix = l => (l === 'en' ? '' : `/${l}`);

const failures = [];
const fail = msg => { failures.push(msg); console.log(`  FAIL ${msg}`); };
const ok = msg => console.log(`  ok   ${msg}`);

const browser = await chromium.launch();

for (const l of LOCALES) {
  for (const [w, h] of [[375, 812], [1280, 800]]) {
    const label = `${l} @${w}`;
    console.log(label);
    const context = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await context.newPage();
    const errors = [];
    page.on('console', m => {
      const from = m.location().url;
      if (m.type() !== 'error' || /report-only Content Security Policy/.test(m.text())) return;
      if (from && !from.startsWith(BASE)) return;
      errors.push(m.text());
    });
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`${BASE}${prefix(l)}/chart-simulator/`, { waitUntil: 'networkidle' });
    await page.mouse.move(0, 0); // keep the crosshair off the chart
    const chart = page.locator('[data-chart-overlay]').locator('xpath=..');
    await chart.locator('canvas').first().waitFor();
    await page.waitForTimeout(300);

    const read = () => page.evaluate(() => {
      const el = document.querySelector('[data-markers]');
      return el ? { markers: Number(el.dataset.markers), labels: Number(el.dataset.markerLabels), width: el.clientWidth } : null;
    });
    const shot = async name => { if (SHOTS) await chart.screenshot({ path: join(SHOTS, `chart-markers-${l}-${w}-${name}.png`) }); };

    const start = await read();
    await shot('start');
    if (!start) {
      console.log('  --   no marker counts on this build; screenshots only');
    } else {
      const narrow = start.width < 640;
      console.log(`  --   chart ${start.width}px wide (${narrow ? 'narrow' : 'wide'}); start: ${start.markers} markers, ${start.labels} labelled`);
      if (narrow && start.labels !== 0) fail(`${label}: ${start.labels} labels with nothing selected`);
      if (!narrow && start.labels !== start.markers) fail(`${label}: ${start.labels} of ${start.markers} markers labelled with nothing selected`);
    }

    // Step to the end. A 1D session has 101 candles with 31 revealed.
    let steps = 0, maxLabels = 0, singleLabel = 0, last = start;
    for (; steps < 90; steps++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(40);
      const now = await read();
      if (now) {
        maxLabels = Math.max(maxLabels, now.labels);
        if (now.labels === 1) singleLabel++;
        if (now.width < 640 && now.labels > 1) fail(`${label}: ${now.labels} labels after step ${steps + 1}`);
        if (now.markers > 0 && now.labels === 0 && last && now.markers > last.markers && now.width < 640) {
          fail(`${label}: a new marker at step ${steps + 1} left no label`);
        }
        last = now;
      }
      if (steps === 35) await shot('mid');
    }
    await shot('end');
    if (last) {
      console.log(`  --   end: ${last.markers} markers, ${last.labels} labelled; most labels at once ${maxLabels}`);
      if (last.width < 640) {
        if (singleLabel === 0) fail(`${label}: the selected pattern's latest marker was never labelled`);
        else ok(`${label}: at most one label at every step (${singleLabel} steps showed one)`);
      } else if (maxLabels === 0) fail(`${label}: no labels on the wide chart`);
      else ok(`${label}: wide chart keeps its labels`);
    }
    if (errors.length) fail(`${label}: console errors: ${errors.join(' | ')}`);
    await context.close();
  }
}

await browser.close();
console.log(failures.length ? `\n${failures.length} failure(s)` : '\nall ok');
process.exit(failures.length ? 1 : 0);
