# Legal pages drift audit: /privacy, /terms, /disclaimer

**Status: report only. Nothing was edited.** Generated 2026-10-16 at `7317972`.

## Result: no drift

No English legal page has been edited since it was translated, and nothing the policies describe has changed in the code. **There are no English commits to carry over.**

| Page | Translated into all 7 locales | English commits after that | Locales missing a change |
|---|---|---|---|
| `/privacy/` | `7c134d4` (2026-09-05) | **none** | none |
| `/terms/` | `7c134d4` (2026-09-05) | **none** | none |
| `/disclaimer/` | `7c134d4` (2026-09-05) | **none** | none |

## Evidence

### 1. English file history

The last commit touching `src/pages/privacy.astro`, `terms.astro` or `disclaimer.astro` is `7c134d4` itself. That commit only wired the hreflang `alternates` prop into the English pages: an import, the `alternates={…}` attribute, and `<Navbar alternates={…}>`. It made no copy change. The substantive English edits all predate the translation:

- `6a9a44e`, 2026-08-11: cookie consent banner, plus the expanded cookies section in privacy. This is the source of the "Last updated: August 11, 2026" date.
- `5fa86c6` / `1ebde3d` / `a823566`, 2026-08-12: voice changes, ending in plural first person.
- `7c0b223`, 2026-08-13: metadata only, on terms and disclaimer.
- `66c9af3`, 2026-08-17: compressHTML spacing fix.

### 2. Behaviour the policies describe

Commits since 2026-09-05 touching the consent banner (`CookieConsent.astro`, `ConsentScripts.astro`), the layouts, `public/ads.txt`, `public/_headers`, the trading/analytics/chart islands and `src/lib`: only `e38815b`, `28c2af0` and `7f5a7aa`. All three are internal-link changes. **Nothing changed** in how Google Analytics or AdSense load, Consent Mode signalling, cookies, or what is written to browser storage.

The policy text still matches the code in every locale:

- **Browser storage.** The code writes `stockade_balance`, `stockade_trades`, `stockade_prices`, `theme` and `stockade-cookie-consent` (the last in `ConsentScripts.astro`). The privacy page's "Essential Use" section discloses "virtual portfolio, trade history, theme preference, and your cookie consent choice". "Local Storage" adds "other settings", which covers the cached price series. All 7 translations list the same four items.
- **Third parties.** Google Fonts, Google Analytics, Google AdSense, Google Consent Mode and hosting are present in all 8 versions.

### 3. Structural parity of the built pages (`dist/`)

| Page | Headings / list items (en) | All 7 translations | External links (opt-outs, Google policy pages, `mailto:`) | "Last updated" |
|---|---|---|---|---|
| privacy | 9 h2, 13 h3 | identical counts | identical set in all 8 | August 11, 2026 in all 8, each in local date format |
| terms | 10 h2, 5 li | identical counts | identical | June 22, 2026 in all 8 |
| disclaimer | 8 h2, 9 li | identical counts | identical | June 22, 2026 in all 8 |

The only token difference flagged was the English word "theme". In English it appears in an inline theme-loading script and in "theme preference", which each translation correctly renders in its own language (tema, テーマ設定, 테마 설정, thème, Theme-Präferenz).

## Keeping it that way

- Any future edit to an English legal page must be carried into all 7 locales in the same commit. The pages carry a "translated for convenience; English is authoritative" notice, which limits the legal exposure, but the content should still match.
- Any change to what is stored, what loads before or after consent, or which third parties are used should trigger a review of `/privacy/` in all 8 locales, not only English. This audit checked behaviour as of `7317972`.
- To re-run: compare `git log -- src/pages/{privacy,terms,disclaimer}.astro` against each locale file's add commit, then diff heading, list and external-link counts in `dist/`.
