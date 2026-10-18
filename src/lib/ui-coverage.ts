// Compares every locale's ui.ts dictionary against the base (English) one.
//
// A locale is "complete" unless it appears in `pending`, in which case it may
// be missing keys that start with one of its declared prefixes — the keys a
// rollout batch hasn't reached yet — but nothing else, so already-translated
// keys cannot quietly regress while a batch is in progress. Missing keys fall
// back to English at runtime via t(), which is exactly why they're invisible
// without a check like this.

export interface CoverageReport {
  locale: string;
  complete: boolean;
  /** Missing keys covered by the locale's pending prefixes (allowed). */
  pending: string[];
  /** Missing keys that fail the build. */
  violations: string[];
  /** Keys present in the locale but not in the base (likely typos or stale keys). */
  extra: string[];
}

export function uiCoverage(
  dicts: Record<string, Record<string, string | undefined>>,
  base: string,
  pending: Partial<Record<string, readonly string[]>>,
): CoverageReport[] {
  const baseKeys = Object.keys(dicts[base] ?? {}).filter(k => dicts[base][k] !== undefined);
  return Object.entries(dicts)
    .filter(([locale]) => locale !== base)
    .map(([locale, dict]) => {
      const prefixes = pending[locale];
      const missing = baseKeys.filter(k => dict[k] === undefined || dict[k] === '');
      const allowed = (k: string) => !!prefixes && prefixes.some(p => k.startsWith(p));
      return {
        locale,
        complete: !prefixes,
        pending: missing.filter(allowed),
        violations: missing.filter(k => !allowed(k)),
        // A `.zero` plural form is optional per locale (see plural() in format.ts)
        extra: Object.keys(dict).filter(k => !baseKeys.includes(k) && !k.endsWith('.zero')),
      };
    });
}

/**
 * The one-word status the build log prints for a locale. A locale with
 * violations is "incomplete" whether or not it is pending, so the log never
 * calls complete the locale that is failing the build.
 */
export function coverageStatus(r: CoverageReport): string {
  if (r.violations.length) {
    const pending = r.pending.length ? `, ${r.pending.length} pending` : '';
    return `incomplete (${r.violations.length} missing${pending})`;
  }
  return r.complete ? 'complete' : `partial (${r.pending.length} pending)`;
}
