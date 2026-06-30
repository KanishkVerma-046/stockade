const key = 'e3d888ea66514206832e8e56e27eed7d';
const host = 'stockademarketsim.com';

const urls = [
  'https://stockademarketsim.com/',
  'https://stockademarketsim.com/simulator',
  'https://stockademarketsim.com/chart-simulator',
  'https://stockademarketsim.com/live',
  'https://stockademarketsim.com/markets',
  'https://stockademarketsim.com/analytics',
  'https://stockademarketsim.com/about',
  'https://stockademarketsim.com/contact',
  'https://stockademarketsim.com/disclaimer',
  'https://stockademarketsim.com/privacy',
  'https://stockademarketsim.com/terms',
];

const res = await fetch('https://www.bing.com/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});

console.log(`Status: ${res.status} ${res.statusText}`);
if (res.status === 200) console.log('✓ All URLs submitted to Bing successfully.');
else if (res.status === 202) console.log('✓ Accepted — URLs queued for crawling.');
else console.log('Response:', await res.text());
