import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const key = 'e3d888ea66514206832e8e56e27eed7d';
const host = 'stockademarketsim.com';

// The URL list is derived from the built sitemap rather than hand-maintained.
// astro.config.mjs already produces exactly the right set: `trailingSlash:
// 'always'` yields the non-redirecting form, and the sitemap `filter` drops
// /404 and /500. The hand-written list drifted badly — the entire /blog
// section (21 URLs) was never submitted, and a retired /live URL was.
//
// Requires a build first; the sitemap is a build artefact.
const sitemapPath = fileURLToPath(new URL('./dist/sitemap.xml', import.meta.url));
const dryRun = process.argv.includes('--dry-run');

let xml;
try {
  xml = await readFile(sitemapPath, 'utf8');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`No sitemap at ${sitemapPath}\nRun \`npm run build\` first.`);
    process.exit(1);
  }
  throw err;
}

const decodeEntities = s =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&'); // must come last

const urls = [
  ...new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => decodeEntities(m[1].trim()))
  ),
];

// Submitting an empty list would silently no-op and look like success.
if (urls.length === 0) {
  console.error('Sitemap contained no <loc> entries — refusing to submit an empty list.');
  process.exit(1);
}

// IndexNow rejects a submission whose host does not match the key's host, so
// catch it here with a useful message rather than as an opaque 422.
const foreign = urls.filter(u => URL.parse(u)?.host !== host);
if (foreign.length > 0) {
  console.error(`Sitemap contains URLs outside ${host}:\n  ${foreign.join('\n  ')}`);
  process.exit(1);
}

// IndexNow caps a single submission at 10,000 URLs.
if (urls.length > 10_000) {
  console.error(
    `Sitemap has ${urls.length} URLs, over IndexNow's 10,000-per-request limit. ` +
      'Batch the submission before running this again.'
  );
  process.exit(1);
}

if (dryRun) {
  console.log(`Dry run — ${urls.length} URLs would be submitted:`);
  for (const u of urls) console.log(`  ${u}`);
  process.exit(0);
}

console.log(`Submitting ${urls.length} URLs from sitemap.xml...`);

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
