import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { assertPublishEnv } from './publish-env.mjs';

const key = 'e3d888ea66514206832e8e56e27eed7d';
const host = 'stockademarketsim.com';

// Three modes:
//
//   node submit-indexnow.mjs [--dry-run]
//     Full: submit every URL in dist/sitemap.xml.
//   node submit-indexnow.mjs --save-live <file>
//     Before a deploy: save the production sitemap to <file> as the baseline.
//   node submit-indexnow.mjs --changed-since <file> [--dry-run]
//     After that deploy: submit only the URLs added to or removed from the
//     sitemap since <file>. Submits nothing when nothing changed.
//
// The scheduled GitHub Action uses the last two, so a day with no new post
// submits nothing and a publishing Monday submits just that post's 8 URLs.
//
// The URL list is derived from the built sitemap rather than hand-maintained.
// astro.config.mjs already produces exactly the right set: `trailingSlash:
// 'always'` yields the non-redirecting form, and the sitemap `filter` drops
// /404 and /500. The hand-written list drifted badly — the entire /blog
// section (21 URLs) was never submitted, and a retired /live URL was.
//
// Requires a build first; the sitemap is a build artefact.
const sitemapPath = fileURLToPath(new URL('./dist/sitemap.xml', import.meta.url));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const optionValue = name => {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const value = args[i + 1];
  if (!value || value.startsWith('--')) fail(`${name} needs a file path`);
  return value;
};
const saveLive = optionValue('--save-live');
const changedSince = optionValue('--changed-since');

function fail(message) {
  console.error(message);
  process.exit(1);
}

const decodeEntities = s =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&'); // must come last

const sitemapUrls = xml => [
  ...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decodeEntities(m[1].trim()))),
];

if (saveLive) {
  // Cache-busted so a stale edge copy can't stand in for what is live.
  const res = await fetch(`https://${host}/sitemap.xml?v=${Date.now()}`);
  const xml = await res.text();
  if (!res.ok) fail(`Fetching the live sitemap failed: ${res.status} ${res.statusText}`);
  const count = sitemapUrls(xml).length;
  if (count === 0) fail('The live sitemap has no <loc> entries; not saving it as a baseline.');
  await writeFile(saveLive, xml);
  console.log(`Saved the live sitemap (${count} URLs) to ${saveLive}.`);
  process.exit(0);
}

// A preview build includes future posts; submitting them would announce
// pages that are not live.
assertPublishEnv();

let xml;
try {
  xml = await readFile(sitemapPath, 'utf8');
} catch (err) {
  if (err.code === 'ENOENT') fail(`No sitemap at ${sitemapPath}\nRun \`npm run build\` first.`);
  throw err;
}

const built = sitemapUrls(xml);

// Submitting an empty list would silently no-op and look like success.
if (built.length === 0) fail('Sitemap contained no <loc> entries — refusing to submit an empty list.');

let urls = built;
if (changedSince) {
  let baselineXml;
  try {
    baselineXml = await readFile(changedSince, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') fail(`No baseline sitemap at ${changedSince}. Save one with --save-live before deploying.`);
    throw err;
  }
  const before = new Set(sitemapUrls(baselineXml));
  const after = new Set(built);
  const added = built.filter(u => !before.has(u));
  const removed = [...before].filter(u => !after.has(u));
  console.log(`Sitemap: ${before.size} URLs live before this deploy, ${after.size} now.`);
  for (const u of added) console.log(`  + ${u}`);
  for (const u of removed) console.log(`  - ${u}`);
  if (added.length + removed.length === 0) {
    console.log('No URLs added or removed — nothing to submit.');
    process.exit(0);
  }
  urls = [...added, ...removed];
  if (!dryRun) await reportLiveStatus(added, removed);
}

// IndexNow rejects a submission whose host does not match the key's host, so
// catch it here with a useful message rather than as an opaque 422.
const foreign = urls.filter(u => URL.parse(u)?.host !== host);
if (foreign.length > 0) fail(`Sitemap contains URLs outside ${host}:\n  ${foreign.join('\n  ')}`);

// IndexNow caps a single submission at 10,000 URLs.
if (urls.length > 10_000) {
  fail(
    `Sitemap has ${urls.length} URLs, over IndexNow's 10,000-per-request limit. ` +
      'Batch the submission before running this again.'
  );
}

if (dryRun) {
  console.log(`Dry run — ${urls.length} URLs would be submitted:`);
  for (const u of urls) console.log(`  ${u}`);
  process.exit(0);
}

console.log(`Submitting ${urls.length} URLs${changedSince ? '' : ' from sitemap.xml'}...`);

const res = await fetch('https://www.bing.com/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});

console.log(`Status: ${res.status} ${res.statusText}`);
if (res.status === 200) console.log('✓ All URLs submitted to Bing successfully.');
else if (res.status === 202) console.log('✓ Accepted — URLs queued for crawling.');
else {
  console.log('Response:', await res.text());
  // Previously this exited 0 on failure, so a rejected submission looked fine.
  process.exitCode = 1;
}

/**
 * Logs whether each added URL already answers 200 on production, and each
 * removed one no longer does, retrying briefly: a brand-new path can 404 on
 * the custom domain for a short while after a deploy (stale edge negative
 * cache). It only reports; the URLs are submitted either way, since a missed
 * submission is never retried (the next run's baseline already includes them).
 */
async function reportLiveStatus(added, removed) {
  const expectOk = new Map([...added.map(u => [u, true]), ...removed.map(u => [u, false])]);
  let pending = [...expectOk.keys()];
  for (let attempt = 1; attempt <= 6 && pending.length > 0; attempt++) {
    if (attempt > 1) await new Promise(r => setTimeout(r, 20_000));
    const results = await Promise.all(
      pending.map(async u => {
        const status = await fetch(u, { method: 'HEAD' }).then(r => r.status, () => 0);
        return { u, status, ok: (status === 200) === expectOk.get(u) };
      })
    );
    pending = results.filter(r => !r.ok).map(r => r.u);
    if (pending.length > 0 && attempt === 6) {
      for (const r of results.filter(r => !r.ok)) {
        console.log(`::warning::${r.u} answered ${r.status || 'no response'} after the deploy; submitting it anyway.`);
      }
    }
  }
  if (pending.length === 0) console.log('Production already serves every added URL and none of the removed ones.');
}
