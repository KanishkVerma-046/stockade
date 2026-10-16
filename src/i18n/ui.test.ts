import { describe, expect, it } from 'vitest';
import { t, translations, UI_PENDING } from './ui';
import { uiCoverage } from '../lib/ui-coverage';

describe('t', () => {
  it('returns the English string for the English locale', () => {
    expect(t('en', 'nav.simulator')).toBe('Trading Simulator');
  });

  it('returns the translated string when the locale has it', () => {
    expect(t('es', 'nav.simulator')).toBe('Simulador de Trading');
  });

  it('returns the translated string for Italian', () => {
    expect(t('it', 'nav.simulator')).toBe('Simulatore di Trading');
  });
});

// Same rule the build enforces (uiCoverageCheck in astro.config.mjs): a locale
// is complete unless listed in UI_PENDING, and a pending locale may only be
// missing keys under its declared prefixes.
describe('ui.ts coverage', () => {
  const reports = uiCoverage(translations, 'en', UI_PENDING);

  it.each(reports.map(r => [r.locale, r] as const))('%s has every English key it is required to have', (_locale, r) => {
    expect(r.violations).toEqual([]);
    if (r.complete) expect(r.pending).toEqual([]);
  });

  it('has no keys that English lacks', () => {
    for (const r of reports) expect(r.extra).toEqual([]);
  });
});
