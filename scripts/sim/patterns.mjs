// Pattern-detection simulation for /chart-simulator/. Not part of `npm test`.
//
//   node scripts/sim/patterns.mjs [--per 100] [--seed 1] [--rev <git-rev>] [--compare <git-rev>] [--check]
//
// Pulls SYMBOLS, TIMEFRAMES, PATTERNS, generateCandles, detectPatterns and
// buildMarkers verbatim out of ChartSimulator.tsx (the working tree, or --rev
// from git), strips the types with esbuild, and runs `--per` sessions for every
// symbol x timeframe. Math.random is seeded, and the generator is shared, so
// --compare <rev> runs the old detector on the very same sessions and prints it
// as the first column. Detection runs on the full session, which equals the
// union of every reveal step (a match depends only on earlier candles).
// --check exits 1 if the library is not 24 entries, a NOT_GENERATED pattern
// fires, a multi-candle pattern overlaps an earlier match of itself, or a
// reversal fires after the wrong trend (or with under 4 candles of history).

import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { transform } from 'esbuild';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SRC = 'src/components/chartsimulator/ChartSimulator.tsx';
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const PER = Number(arg('--per') ?? 100);
const SEED = Number(arg('--seed') ?? 1);
const REV = arg('--rev');
const COMPARE = arg('--compare');
const CHECK = process.argv.includes('--check');

async function load(rev) {
  const raw = rev
    ? execFileSync('git', ['show', `${rev}:${SRC}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 })
    : readFileSync(join(ROOT, SRC), 'utf8');
  const src = raw.replace(/\r\n/g, '\n');
  const slice = (from, to) => {
    const a = src.indexOf(from); const b = src.indexOf(to, a + from.length);
    if (a < 0 || b < 0) throw new Error(`${rev ?? 'working tree'}: can't find ${from} … ${to} in ${SRC}`);
    return src.slice(a, b);
  };
  const ts = [
    slice('interface Candle {', '// ── Symbols'),
    slice('const SYMBOLS = [', 'const SPEED_MAP'),
    slice('const TYPE_COLOR', '\n') + '\n',
    slice('const NOT_GENERATED', 'function calcEMA'),
  ].join('\n') + `
export { SYMBOLS, TIMEFRAMES, PATTERNS, NOT_GENERATED, generateCandles, detectPatterns, buildMarkers };
export const CONTEXT = typeof REVERSAL_CONTEXT === 'undefined' ? null : REVERSAL_CONTEXT;
`;
  const { code } = await transform(ts, { loader: 'ts', format: 'esm' });
  return import('data:text/javascript,' + encodeURIComponent(code));
}

function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const blank = () => ({ det: {}, sessWith: {}, max: {}, tot: [], markers: [], distinct: [], near1: [], near4: [], maxSame: [], candles: 0, sessions: 0 });

function run(core) {
  const { SYMBOLS, TIMEFRAMES, generateCandles, detectPatterns, buildMarkers, PATTERNS } = core;
  const all = blank(); const byTf = Object.fromEntries(TIMEFRAMES.map(t => [t.id, blank()]));
  const sessionsOut = [];
  Math.random = mulberry32(SEED);
  for (const sym of SYMBOLS) for (const tf of TIMEFRAMES) for (let r = 0; r < PER; r++) {
    const candles = generateCandles(tf.candles, sym.basePrice, tf.deltaMs);
    const dets = detectPatterns(candles);
    sessionsOut.push({ candles, dets });
    for (const s of [all, byTf[tf.id]]) record(s, dets, candles, buildMarkers, PATTERNS);
  }
  return { all, byTf, sessions: sessionsOut };
}

function record(s, dets, candles, buildMarkers, PATTERNS) {
  const cnt = {};
  for (const d of dets) cnt[d.patternId] = (cnt[d.patternId] ?? 0) + 1;
  for (const p of PATTERNS) {
    const k = cnt[p.id] ?? 0;
    s.det[p.id] = (s.det[p.id] ?? 0) + k;
    if (k) s.sessWith[p.id] = (s.sessWith[p.id] ?? 0) + 1;
    s.max[p.id] = Math.max(s.max[p.id] ?? 0, k);
  }
  s.tot.push(dets.length); s.distinct.push(Object.keys(cnt).length);
  const mk = buildMarkers(dets, candles, null);
  s.markers.push(mk.length);
  const byTime = new Map(candles.map((c, i) => [Math.floor(c.time / 1000), i]));
  const idx = mk.map(m => byTime.get(m.time)).sort((a, b) => a - b);
  const near = k => idx.filter((v, j) => (j > 0 && v - idx[j - 1] <= k) || (j < idx.length - 1 && idx[j + 1] - v <= k)).length;
  s.near1.push(near(1)); s.near4.push(near(4));
  const per = {}; for (const m of mk) per[m.patternId] = (per[m.patternId] ?? 0) + 1;
  s.maxSame.push(Math.max(0, ...Object.values(per)));
  s.candles += candles.length; s.sessions++;
}

function check(core, result) {
  const errs = [];
  if (core.PATTERNS.length !== 24) errs.push(`library has ${core.PATTERNS.length} entries, not 24`);
  for (const id of core.NOT_GENERATED) if (result.all.det[id]) errs.push(`${id} (NOT_GENERATED) fired ${result.all.det[id]} times`);
  const cat = Object.fromEntries(core.PATTERNS.map(p => [p.id, p.category]));
  let overlaps = 0, wrongTrend = 0;
  for (const { candles, dets } of result.sessions) {
    const lastEnd = {};
    for (const d of dets) {
      if (cat[d.patternId] !== 'single' && lastEnd[d.patternId] !== undefined && d.startIdx <= lastEnd[d.patternId]) overlaps++;
      lastEnd[d.patternId] = d.endIdx;
      const need = core.CONTEXT?.[d.patternId];
      if (need) {
        const s = d.startIdx;
        const t = s < 4 ? null : candles[s - 1].close >= candles[s - 4].close ? 'up' : 'down';
        if (t !== need) wrongTrend++;
      }
    }
  }
  if (overlaps) errs.push(`${overlaps} multi-candle detections overlap an earlier one of the same pattern`);
  if (!core.CONTEXT) errs.push('no REVERSAL_CONTEXT in this revision');
  else if (wrongTrend) errs.push(`${wrongTrend} reversal detections after the wrong trend`);
  return errs;
}

const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };

const cols = [];
if (COMPARE) cols.push({ name: COMPARE, core: await load(COMPARE) });
cols.push({ name: REV ?? 'working tree', core: await load(REV) });
for (const c of cols) c.res = run(c.core);

const base = cols[cols.length - 1];
const N = base.res.all.sessions;
const W = 24;
const head = label => console.log('\n' + label.padEnd(30) + cols.map(c => c.name.slice(0, W - 2).padStart(W)).join(''));
console.log(`${N} sessions per column (${base.core.SYMBOLS.length} symbols x ${base.core.TIMEFRAMES.length} timeframes x ${PER}), ${base.res.all.candles} candles, seed ${SEED}`);
console.log(`library: ${cols.map(c => `${c.name} ${c.core.PATTERNS.length}`).join(', ')} entries`);

head('PER PATTERN  mean · %≥1 · max');
for (const p of base.core.PATTERNS) {
  if (base.core.NOT_GENERATED.has(p.id)) continue;
  console.log(p.id.padEnd(30) + cols.map(c => {
    const s = c.res.all;
    return `${((s.det[p.id] ?? 0) / N).toFixed(2)} · ${(100 * (s.sessWith[p.id] ?? 0) / N).toFixed(0)}% · ${s.max[p.id] ?? 0}`.padStart(W);
  }).join(''));
}
console.log('NOT_GENERATED (9), total'.padEnd(30) + cols.map(c => String([...c.core.NOT_GENERATED].reduce((a, id) => a + (c.res.all.det[id] ?? 0), 0)).padStart(W)).join(''));

head('PER SESSION  mean · median · p95');
const row = (label, key) => console.log(label.padEnd(30) + cols.map(c => { const a = c.res.all[key]; return `${mean(a).toFixed(1)} · ${q(a, 0.5)} · ${q(a, 0.95)}`.padStart(W); }).join(''));
row('detections', 'tot'); row('markers (1 per candle)', 'markers'); row('distinct patterns', 'distinct');
console.log('distinct patterns min-max'.padEnd(30) + cols.map(c => `${Math.min(...c.res.all.distinct)}-${Math.max(...c.res.all.distinct)}`.padStart(W)).join(''));
row('markers, neighbour <=1 candle', 'near1'); row('markers, neighbour <=4 candles', 'near4');
row('most markers, one pattern', 'maxSame');

head('BY TIMEFRAME  detections · markers · distinct (means)');
for (const tf of base.core.TIMEFRAMES) {
  console.log(`${tf.id} (${tf.candles + 1} candles)`.padEnd(30) + cols.map(c => { const s = c.res.byTf[tf.id]; return `${mean(s.tot).toFixed(1)} · ${mean(s.markers).toFixed(1)} · ${mean(s.distinct).toFixed(1)}`.padStart(W); }).join(''));
}

head('1D SESSIONS  mean · max per pattern');
for (const p of base.core.PATTERNS) {
  if (base.core.NOT_GENERATED.has(p.id)) continue;
  console.log(p.id.padEnd(30) + cols.map(c => { const s = c.res.byTf['1D']; return `${((s.det[p.id] ?? 0) / s.sessions).toFixed(2)} · ${s.max[p.id] ?? 0}`.padStart(W); }).join(''));
}

if (CHECK) {
  const errs = check(base.core, base.res);
  console.log(`\ncheck (${base.name}): ${errs.length ? 'FAIL' : 'ok'}`);
  for (const e of errs) console.log('  ' + e);
  if (errs.length) process.exit(1);
}
