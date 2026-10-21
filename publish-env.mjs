// Refuses to publish from a preview environment. SHOW_FUTURE=1 builds future
// posts for local review, and STOCKADE_BUILD_TIME overrides the clock that
// decides which posts are due (src/lib/publish-schedule.ts). Either one would
// let a deploy or an IndexNow submission release posts before their date.
//
// Run directly (`node publish-env.mjs`) by `npm run deploy` and the scheduled
// GitHub Action before building, and imported by submit-indexnow.mjs.

import { fileURLToPath } from 'node:url';

const PREVIEW_VARS = ['SHOW_FUTURE', 'STOCKADE_BUILD_TIME'];

export function assertPublishEnv(env = process.env) {
  const set = PREVIEW_VARS.filter(name => env[name] !== undefined && env[name] !== '');
  if (set.length === 0) return;
  console.error(
    `Refusing to publish: ${set.join(' and ')} ${set.length > 1 ? 'are' : 'is'} set, which would release ` +
      `posts before their date. Unset ${set.length > 1 ? 'them' : 'it'} and run again:\n` +
      `  PowerShell: ${set.map(n => `Remove-Item Env:${n}`).join('; ')}\n` +
      `  bash:       unset ${set.join(' ')}`
  );
  process.exit(1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) assertPublishEnv();
