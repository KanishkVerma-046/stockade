# i18n Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give stockademarketsim.com the routing/hreflang/switcher/chrome-translation foundation for 7 new languages (es, ja, fr, de, pt, ko, it) plus English default, and prove it end-to-end with the homepage translated into Spanish.

**Architecture:** Astro's built-in i18n routing (`i18n` config, file-based `src/pages/{locale}/...` translated pages) backed by a single locale-metadata registry that every consumer (hreflang `<link>` tags, sitemap, `<html lang>`, og:locale) reads from — so none of those surfaces can drift out of sync with each other. Shared chrome (Navbar/Footer/CookieConsent) reads a UI-string dictionary with per-key English fallback.

**Tech Stack:** Astro 7 (static output), `@astrojs/sitemap`, TypeScript, Vitest (for pure-logic unit tests only — no JSX transform, `.astro`/`.tsx` files are verified by building and inspecting `dist/`, not by vitest).

**Spec:** `docs/superpowers/specs/2026-08-31-i18n-infrastructure-design.md`

## Global Constraints

- Astro 7, static output, `trailingSlash: 'always'`. No backend.
- Existing English URLs must not change. English stays unprefixed at `/`; new locales live under `/{code}/`.
- `hreflang` values are bare language codes (`en`, `es`, `ja`, `fr`, `de`, `ko`, `it`) except Portuguese, which is `pt-BR`. This single mapping lives in `src/i18n/locales.ts` and every other surface (page `<link>` tags, sitemap, `<html lang>`) reads it from there — never re-type it.
- `og:locale` values are always region-tagged (`es_ES`, `ja_JP`, `fr_FR`, `de_DE`, `pt_BR`, `ko_KR`, `it_IT`, `en_US`) because the Open Graph spec has no bare-language form. `es_ES` is an unconfirmed placeholder — do not treat it as a considered choice; the Iberian-vs-Latin-American decision belongs to a future Spanish-content phase.
- `<html lang>` is resolved by looking up the current locale's `hreflang` value in the registry — never read `Astro.currentLocale` directly for this, since it would give `pt` instead of `pt-BR` for Portuguese.
- `Layout.astro` and `AppLayout.astro` have no shared head partial — every head-level change must be made in both.
- `compressHTML` deletes a whitespace run containing a newline at a tag boundary — any translated copy with inline `<strong>`/`<em>` must keep the adjacent space on the same source line as the tag. Verify in `dist/`, not source.
- No browser-language auto-detection/redirect, no translated 404/500, no translated legal pages, no blog i18n, no translation of the Simulator/Chart Simulator/Markets/Analytics React apps. These are out of scope for this phase.
- No deploy. Every task's verification is `npm run build` (+ inspecting `dist/`), never `npm run deploy`.

---

### Task 1: Locale registry

**Files:**
- Create: `src/i18n/locales.ts`
- Test: `src/i18n/locales.test.ts`

**Interfaces:**
- Produces: `type Locale = 'en'|'es'|'ja'|'fr'|'de'|'pt'|'ko'|'it'`; `interface LocaleMeta { code: Locale; nativeName: string; hreflang: string; ogLocale: string }`; `const LOCALES: LocaleMeta[]`; `const DEFAULT_LOCALE: Locale`; `function getLocaleMeta(code: string | undefined): LocaleMeta`; `function toSitemapLocaleMap(locales?: LocaleMeta[]): Record<string, string>`.

- [ ] **Step 1: Write the failing test**

Create `src/i18n/locales.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE, getLocaleMeta, LOCALES, toSitemapLocaleMap } from './locales';

describe('getLocaleMeta', () => {
  it('returns bare hreflang for most locales', () => {
    expect(getLocaleMeta('es').hreflang).toBe('es');
    expect(getLocaleMeta('ja').hreflang).toBe('ja');
    expect(getLocaleMeta('fr').hreflang).toBe('fr');
    expect(getLocaleMeta('de').hreflang).toBe('de');
    expect(getLocaleMeta('ko').hreflang).toBe('ko');
    expect(getLocaleMeta('it').hreflang).toBe('it');
    expect(getLocaleMeta('en').hreflang).toBe('en');
  });

  it('returns the pt-BR region tag for Portuguese', () => {
    expect(getLocaleMeta('pt').hreflang).toBe('pt-BR');
  });

  it('falls back to the default locale for an unknown code', () => {
    expect(getLocaleMeta('xx').code).toBe(DEFAULT_LOCALE);
  });

  it('falls back to the default locale when code is undefined', () => {
    expect(getLocaleMeta(undefined).code).toBe(DEFAULT_LOCALE);
  });
});

describe('toSitemapLocaleMap', () => {
  it('produces the exact same hreflang values as the registry, keyed by locale code', () => {
    const map = toSitemapLocaleMap(LOCALES);
    for (const locale of LOCALES) {
      expect(map[locale.code]).toBe(locale.hreflang);
    }
  });

  it('matches the bare-code-except-Portuguese scheme', () => {
    const map = toSitemapLocaleMap(LOCALES);
    expect(map).toEqual({
      en: 'en', es: 'es', ja: 'ja', fr: 'fr', de: 'de', pt: 'pt-BR', ko: 'ko', it: 'it',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/i18n/locales.test.ts`
Expected: FAIL — `Cannot find module './locales'` (file doesn't exist yet).

- [ ] **Step 3: Write the implementation**

Create `src/i18n/locales.ts`:

```ts
export type Locale = 'en' | 'es' | 'ja' | 'fr' | 'de' | 'pt' | 'ko' | 'it';

export interface LocaleMeta {
  code: Locale;
  nativeName: string;
  hreflang: string;
  ogLocale: string;
}

export const DEFAULT_LOCALE: Locale = 'en';

// hreflang is a bare language code for every locale except Portuguese, which is
// deliberately pt-BR (Brazilian) — "Portuguese" alone is ambiguous. og:locale is
// always region-tagged because the Open Graph spec has no bare-language form;
// es_ES here is an infra placeholder, not a considered targeting decision.
export const LOCALES: LocaleMeta[] = [
  { code: 'en', nativeName: 'English',   hreflang: 'en',    ogLocale: 'en_US' },
  { code: 'es', nativeName: 'Español',   hreflang: 'es',    ogLocale: 'es_ES' },
  { code: 'ja', nativeName: '日本語',      hreflang: 'ja',    ogLocale: 'ja_JP' },
  { code: 'fr', nativeName: 'Français',  hreflang: 'fr',    ogLocale: 'fr_FR' },
  { code: 'de', nativeName: 'Deutsch',   hreflang: 'de',    ogLocale: 'de_DE' },
  { code: 'pt', nativeName: 'Português', hreflang: 'pt-BR', ogLocale: 'pt_BR' },
  { code: 'ko', nativeName: '한국어',      hreflang: 'ko',    ogLocale: 'ko_KR' },
  { code: 'it', nativeName: 'Italiano',  hreflang: 'it',    ogLocale: 'it_IT' },
];

const BY_CODE: Record<string, LocaleMeta> = Object.fromEntries(LOCALES.map(l => [l.code, l]));

export function getLocaleMeta(code: string | undefined): LocaleMeta {
  if (code && BY_CODE[code]) return BY_CODE[code];
  return BY_CODE[DEFAULT_LOCALE];
}

export function toSitemapLocaleMap(locales: LocaleMeta[] = LOCALES): Record<string, string> {
  return Object.fromEntries(locales.map(l => [l.code, l.hreflang]));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/i18n/locales.test.ts`
Expected: PASS (10 tests).

- [ ] **Step 5: Commit**

```bash
git add src/i18n/locales.ts src/i18n/locales.test.ts
git commit -m "feat(i18n): add locale metadata registry"
```

---

### Task 2: UI string dictionary

**Files:**
- Create: `src/i18n/ui.ts`
- Test: `src/i18n/ui.test.ts`

**Interfaces:**
- Consumes: `Locale` from `src/i18n/locales.ts` (Task 1).
- Produces: `type UiKey = ...` (union of dictionary keys below); `const translations: Record<Locale, Partial<Record<UiKey, string>>>`; `function t(locale: Locale, key: UiKey): string`.

- [ ] **Step 1: Write the failing test**

Create `src/i18n/ui.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { t, translations } from './ui';

describe('t', () => {
  it('returns the English string for the English locale', () => {
    expect(t('en', 'nav.simulator')).toBe('Trading Simulator');
  });

  it('returns the translated string when the locale has it', () => {
    expect(t('es', 'nav.simulator')).toBe('Simulador de Trading');
  });

  it('falls back to English for a locale with no translations yet', () => {
    expect(t('ja', 'nav.simulator')).toBe(translations.en['nav.simulator']);
  });

  it('falls back to English for every key in an untranslated locale', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(t('fr', key)).toBe(translations.en[key]);
    }
  });

  it('has a complete Spanish translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.es[key]).toBeDefined();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/i18n/ui.test.ts`
Expected: FAIL — `Cannot find module './ui'`.

- [ ] **Step 3: Write the implementation**

Create `src/i18n/ui.ts`:

```ts
import type { Locale } from './locales';

export type UiKey =
  | 'nav.simulator'
  | 'nav.chartSimulator'
  | 'nav.markets'
  | 'nav.analytics'
  | 'nav.learn'
  | 'nav.live'
  | 'nav.toggleFullscreen'
  | 'nav.toggleTheme'
  | 'nav.startTrading'
  | 'nav.menu'
  | 'footer.tagline'
  | 'footer.product'
  | 'footer.company'
  | 'footer.legal'
  | 'footer.rights'
  | 'footer.disclaimerText'
  | 'cookie.text'
  | 'cookie.privacyLinkText'
  | 'cookie.reject'
  | 'cookie.accept'
  | 'cookie.ariaLabel'
  | 'home.stats.startingBalance'
  | 'home.stats.tradableAssets'
  | 'home.stats.assetClasses'
  | 'home.stats.costToStart';

type Dictionary = Partial<Record<UiKey, string>>;

const en: Dictionary = {
  'nav.simulator': 'Trading Simulator',
  'nav.chartSimulator': 'Chart Simulator',
  'nav.markets': 'Markets',
  'nav.analytics': 'Analytics',
  'nav.learn': 'Learn',
  'nav.live': 'Live',
  'nav.toggleFullscreen': 'Toggle fullscreen',
  'nav.toggleTheme': 'Toggle light/dark mode',
  'nav.startTrading': 'Start Trading',
  'nav.menu': 'Menu',
  'footer.tagline': 'Practice the market. Master the game. Free virtual trading — no signup required.',
  'footer.product': 'Product',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.rights': 'All rights reserved.',
  'footer.disclaimerText':
    'Stockade is a simulation platform only. All trading is done with virtual money. This is not financial advice. Past simulated performance does not indicate future real results.',
  'cookie.text':
    'We use cookies to improve your experience and serve relevant ads. By using this site, you agree to our use of cookies. Read our',
  'cookie.privacyLinkText': 'Privacy Policy',
  'cookie.reject': 'Reject non-essential',
  'cookie.accept': 'Accept',
  'cookie.ariaLabel': 'Cookie consent',
  'home.stats.startingBalance': 'Starting Balance',
  'home.stats.tradableAssets': 'Tradable Assets',
  'home.stats.assetClasses': 'Asset Classes',
  'home.stats.costToStart': 'Cost to Start',
};

const es: Dictionary = {
  'nav.simulator': 'Simulador de Trading',
  'nav.chartSimulator': 'Simulador de Gráficos',
  'nav.markets': 'Mercados',
  'nav.analytics': 'Analítica',
  'nav.learn': 'Aprender',
  'nav.live': 'En vivo',
  'nav.toggleFullscreen': 'Alternar pantalla completa',
  'nav.toggleTheme': 'Alternar modo claro/oscuro',
  'nav.startTrading': 'Empezar a Operar',
  'nav.menu': 'Menú',
  'footer.tagline': 'Practica el mercado. Domina el juego. Trading virtual gratis — sin registro requerido.',
  'footer.product': 'Producto',
  'footer.company': 'Empresa',
  'footer.legal': 'Legal',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.disclaimerText':
    'Stockade es únicamente una plataforma de simulación. Todas las operaciones se realizan con dinero virtual. Esto no es asesoramiento financiero. El rendimiento simulado pasado no indica resultados reales futuros.',
  'cookie.text':
    'Utilizamos cookies para mejorar tu experiencia y mostrar anuncios relevantes. Al usar este sitio, aceptas nuestro uso de cookies. Lee nuestra',
  'cookie.privacyLinkText': 'Política de Privacidad',
  'cookie.reject': 'Rechazar no esenciales',
  'cookie.accept': 'Aceptar',
  'cookie.ariaLabel': 'Consentimiento de cookies',
  'home.stats.startingBalance': 'Balance Inicial',
  'home.stats.tradableAssets': 'Activos Negociables',
  'home.stats.assetClasses': 'Clases de Activos',
  'home.stats.costToStart': 'Costo para Empezar',
};

export const translations: Record<Locale, Dictionary> = {
  en,
  es,
  ja: {},
  fr: {},
  de: {},
  pt: {},
  ko: {},
  it: {},
};

export function t(locale: Locale, key: UiKey): string {
  return translations[locale]?.[key] ?? translations.en[key]!;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/i18n/ui.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ui.ts src/i18n/ui.test.ts
git commit -m "feat(i18n): add shared-chrome UI string dictionary with English fallback"
```

---

### Task 3: Astro i18n routing + sitemap wiring

**Files:**
- Modify: `astro.config.mjs`

**Interfaces:**
- Consumes: `LOCALES`, `toSitemapLocaleMap` from `src/i18n/locales.ts` (Task 1).

- [ ] **Step 1: Add the i18n config block**

In `astro.config.mjs`, add an import near the top (after the existing `tailwindcss` import):

```js
import { LOCALES, toSitemapLocaleMap } from './src/i18n/locales.ts';
```

Then add `i18n` as a top-level key in the `defineConfig({...})` object (alongside `site`, `trailingSlash`, `integrations`, `vite`):

```js
  i18n: {
    defaultLocale: 'en',
    locales: LOCALES.map(l => l.code),
    routing: { prefixDefaultLocale: false },
  },
```

- [ ] **Step 2: Wire the sitemap i18n option from the same registry**

Still in `astro.config.mjs`, inside the existing `sitemap({...})` call (the one with `filter` and `serialize`), add an `i18n` key built from `toSitemapLocaleMap`:

```js
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: toSitemapLocaleMap(),
      },
      // No lastmod: the only value available here is build time, which
      // would claim every page changed on every deploy. An absent
      // lastmod is better than a false one.
      // robots.txt disallows these; they should not be advertised either.
      filter: page => !/\/(404|500)\/?$/.test(page),
      serialize(item) {
        // ...existing serialize body, unchanged
      },
    }),
```

(Only the `i18n` key is new — do not otherwise touch `filter`/`serialize`.)

- [ ] **Step 3: Build to verify the config loads and existing URLs are unchanged**

Run: `npm run build`
Expected: build succeeds with no import/config errors. Then verify:

```bash
ls dist/index.html dist/simulator/index.html dist/about/index.html
```

Expected: all three still exist at their current (unprefixed) paths — confirms `prefixDefaultLocale: false` didn't move English routes. No `dist/en/` directory should exist.

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(i18n): wire Astro i18n routing and sitemap locale map to the registry"
```

---

### Task 4: hreflang component

**Files:**
- Create: `src/components/layout/HreflangLinks.astro`

**Interfaces:**
- Consumes: `getLocaleMeta`, `DEFAULT_LOCALE`, `type Locale` from `src/i18n/locales.ts` (Task 1).
- Produces: `<HreflangLinks alternates={...} />` — prop `alternates?: Partial<Record<Locale, string>>` (locale code → site-relative path, e.g. `{ en: '/', es: '/es/' }`). Renders nothing when `alternates` is absent or empty.

- [ ] **Step 1: Write the component**

Create `src/components/layout/HreflangLinks.astro`:

```astro
---
import { getLocaleMeta, DEFAULT_LOCALE, type Locale } from '../../i18n/locales';

interface Props {
  alternates?: Partial<Record<Locale, string>>;
}

const { alternates } = Astro.props;
const siteUrl = 'https://stockademarketsim.com';

const entries = alternates ? (Object.entries(alternates) as [Locale, string][]) : [];
const defaultPath = alternates?.[DEFAULT_LOCALE];
---

{entries.length > 0 && (
  <Fragment>
    {entries.map(([code, path]) => (
      <link rel="alternate" hreflang={getLocaleMeta(code).hreflang} href={`${siteUrl}${path}`} />
    ))}
    {defaultPath && <link rel="alternate" hreflang="x-default" href={`${siteUrl}${defaultPath}`} />}
  </Fragment>
)}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds (the component isn't imported anywhere yet, so this just confirms no syntax errors — Astro still type-checks/parses every file in `src/components`).

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/HreflangLinks.astro
git commit -m "feat(i18n): add HreflangLinks component"
```

---

### Task 5: Language switcher component

**Files:**
- Create: `src/components/layout/LanguageSwitcher.astro`

**Interfaces:**
- Consumes: `getLocaleMeta`, `type Locale` from `src/i18n/locales.ts` (Task 1).
- Produces: `<LanguageSwitcher alternates={...} />` — same `alternates` prop shape as `HreflangLinks`. Renders nothing when fewer than 2 entries exist.

- [ ] **Step 1: Write the component**

Create `src/components/layout/LanguageSwitcher.astro`:

```astro
---
import { getLocaleMeta, type Locale } from '../../i18n/locales';

interface Props {
  alternates?: Partial<Record<Locale, string>>;
}

const { alternates } = Astro.props;
const entries = alternates ? (Object.entries(alternates) as [Locale, string][]) : [];
const currentLocale = getLocaleMeta(Astro.currentLocale).code;
---

{entries.length > 1 && (
  <details class="relative">
    <summary
      class="list-none cursor-pointer p-1.5 rounded-md text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] transition-colors flex items-center gap-1"
      aria-label="Change language"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M1.5 8h13M8 1.5c1.8 1.8 2.8 4.2 2.8 6.5s-1 4.7-2.8 6.5c-1.8-1.8-2.8-4.2-2.8-6.5S6.2 3.3 8 1.5z" />
      </svg>
    </summary>
    <ul class="absolute right-0 mt-1 w-40 rounded-md border border-[var(--c-border)] bg-[var(--c-bg)] shadow-lg py-1 z-50">
      {entries.map(([code, path]) => {
        const meta = getLocaleMeta(code);
        const isActive = code === currentLocale;
        return (
          <li>
            <a
              href={path}
              class:list={[
                'block px-3 py-1.5 text-[13px] transition-colors',
                isActive
                  ? 'text-[var(--c-text)] bg-[var(--c-surface)]'
                  : 'text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)]',
              ]}
              aria-current={isActive ? 'true' : undefined}
            >
              {meta.nativeName}
            </a>
          </li>
        );
      })}
    </ul>
  </details>
)}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/LanguageSwitcher.astro
git commit -m "feat(i18n): add LanguageSwitcher component"
```

---

### Task 6: Navbar translation + switcher mount

**Files:**
- Modify: `src/components/layout/Navbar.astro`

**Interfaces:**
- Consumes: `t` from `src/i18n/ui.ts` (Task 2); `getLocaleMeta` from `src/i18n/locales.ts` (Task 1); `LanguageSwitcher` from Task 5.
- Produces: `<Navbar compact? alternates? />` — adds `alternates?: Partial<Record<Locale, string>>` prop alongside the existing `compact?: boolean`.

- [ ] **Step 1: Update the frontmatter**

In `src/components/layout/Navbar.astro`, replace lines 1–18 (the frontmatter block) with:

```astro
---
import { t } from '../../i18n/ui';
import { getLocaleMeta, type Locale } from '../../i18n/locales';
import LanguageSwitcher from './LanguageSwitcher.astro';

interface Props {
  compact?: boolean;
  alternates?: Partial<Record<Locale, string>>;
}
const { compact = false, alternates } = Astro.props;
const currentPath = Astro.url.pathname;
const locale = getLocaleMeta(Astro.currentLocale).code;

const navLinks = [
  { href: '/simulator',       label: t(locale, 'nav.simulator') },
  { href: '/chart-simulator', label: t(locale, 'nav.chartSimulator') },
  { href: '/markets',         label: t(locale, 'nav.markets') },
  { href: '/analytics',       label: t(locale, 'nav.analytics') },
  { href: '/blog',            label: t(locale, 'nav.learn') },
];

function isActive(href: string) {
  return currentPath === href || (href !== '/' && currentPath.startsWith(href));
}
---
```

- [ ] **Step 2: Translate the "Live" badge**

Find the status badge block:

```astro
        <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
        Live
      </div>
```

Replace `Live` with `{t(locale, 'nav.live')}`.

- [ ] **Step 3: Translate the fullscreen toggle's aria-label/title**

Find:

```astro
      <button
        id="fullscreen-toggle"
        aria-label="Toggle fullscreen"
        title="Toggle fullscreen"
```

Replace with:

```astro
      <button
        id="fullscreen-toggle"
        aria-label={t(locale, 'nav.toggleFullscreen')}
        title={t(locale, 'nav.toggleFullscreen')}
```

- [ ] **Step 4: Translate the theme toggle's aria-label/title**

Find:

```astro
        aria-label="Toggle light/dark mode"
        class="p-1.5 rounded-md text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] transition-colors"
        title="Toggle light/dark mode"
```

Replace with:

```astro
        aria-label={t(locale, 'nav.toggleTheme')}
        class="p-1.5 rounded-md text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] transition-colors"
        title={t(locale, 'nav.toggleTheme')}
```

- [ ] **Step 5: Mount the language switcher and translate "Start Trading"**

Find:

```astro
      <a
        href="/simulator"
        class="px-3 py-1.5 rounded-md bg-[#f59e0b] text-[#0a0a0a] text-[13px] font-semibold hover:bg-[#fbbf24] transition-colors whitespace-nowrap"
      >
        Start Trading
      </a>
```

Replace with:

```astro
      <LanguageSwitcher alternates={alternates} />

      <a
        href="/simulator"
        class="px-3 py-1.5 rounded-md bg-[#f59e0b] text-[#0a0a0a] text-[13px] font-semibold hover:bg-[#fbbf24] transition-colors whitespace-nowrap"
      >
        {t(locale, 'nav.startTrading')}
      </a>
```

- [ ] **Step 6: Translate the mobile menu button's aria-label**

Find:

```astro
        class="md:hidden p-1.5 rounded-md text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] transition-colors"
        aria-label="Menu"
```

Replace with:

```astro
        class="md:hidden p-1.5 rounded-md text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-muted)] transition-colors"
        aria-label={t(locale, 'nav.menu')}
```

- [ ] **Step 7: Build and verify English is unchanged**

Run: `npm run build`, then:

```bash
grep -o 'Start Trading' dist/index.html
grep -o 'Trading Simulator' dist/index.html
```

Expected: both still found — English navbar text is byte-identical to before (comes from the `en` dictionary, which mirrors the old hardcoded strings). No `alternates` prop is passed anywhere yet, so `LanguageSwitcher` renders nothing on any page.

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/Navbar.astro
git commit -m "feat(i18n): make Navbar locale-aware and mount the language switcher"
```

---

### Task 7: Footer translation

**Files:**
- Modify: `src/components/layout/Footer.astro`

**Interfaces:**
- Consumes: `t` from `src/i18n/ui.ts` (Task 2); `getLocaleMeta` from `src/i18n/locales.ts` (Task 1).

- [ ] **Step 1: Add the locale lookup**

At the top of `src/components/layout/Footer.astro`, replace:

```astro
---
const year = new Date().getFullYear();
---
```

with:

```astro
---
import { t } from '../../i18n/ui';
import { getLocaleMeta } from '../../i18n/locales';

const year = new Date().getFullYear();
const locale = getLocaleMeta(Astro.currentLocale).code;
---
```

- [ ] **Step 2: Translate the tagline**

Find:

```astro
        <p class="text-[13px] text-[#666666] leading-relaxed max-w-[220px]">
          Practice the market. Master the game. Free virtual trading — no signup required.
        </p>
```

Replace the inner text with `{t(locale, 'footer.tagline')}`.

- [ ] **Step 3: Translate the "Product" column header**

Find:

```astro
        <p class="text-[11px] font-mono uppercase tracking-widest text-[#666666] mb-3">Product</p>
```

Replace `Product` with `{t(locale, 'footer.product')}`. Leave the `<ul>` of links below it unchanged — those link labels (`Trading Simulator`, `Chart Simulator`, `Markets`, `Analytics`, `Learn`) point at pages that aren't translated in this phase, so translating just the labels while the destination stays English-only would be misleading; the nav column labels stay English until the pages they link to exist in that locale (a note for the future page-by-page translation phase).

- [ ] **Step 4: Translate the "Company" and "Legal" column headers**

Find:

```astro
        <p class="text-[11px] font-mono uppercase tracking-widest text-[#666666] mb-3">Company</p>
```

Replace `Company` with `{t(locale, 'footer.company')}`.

Find:

```astro
        <p class="text-[11px] font-mono uppercase tracking-widest text-[#666666] mb-3">Legal</p>
```

Replace `Legal` with `{t(locale, 'footer.legal')}`.

- [ ] **Step 5: Translate the bottom bar**

Find:

```astro
      <p class="text-[12px] text-[#666666]">
        © {year} Stockade. All rights reserved.
      </p>
      <p class="text-[11px] text-[#444444] leading-relaxed max-w-[480px]">
        Stockade is a simulation platform only. All trading is done with virtual money. This is not financial advice. Past simulated performance does not indicate future real results.
      </p>
```

Replace with:

```astro
      <p class="text-[12px] text-[#666666]">
        © {year} Stockade. {t(locale, 'footer.rights')}
      </p>
      <p class="text-[11px] text-[#444444] leading-relaxed max-w-[480px]">
        {t(locale, 'footer.disclaimerText')}
      </p>
```

- [ ] **Step 6: Build and verify English is unchanged**

Run: `npm run build`, then:

```bash
grep -o 'All rights reserved' dist/index.html
grep -o 'This is not financial advice' dist/index.html
```

Expected: both found — English footer text unchanged.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Footer.astro
git commit -m "feat(i18n): make Footer's translatable strings locale-aware"
```

---

### Task 8: CookieConsent translation

**Files:**
- Modify: `src/components/layout/CookieConsent.astro`

**Interfaces:**
- Consumes: `t` from `src/i18n/ui.ts` (Task 2); `getLocaleMeta` from `src/i18n/locales.ts` (Task 1).

- [ ] **Step 1: Add the locale lookup**

At the top of `src/components/layout/CookieConsent.astro`, after the existing comment block, add:

```astro
---
import { t } from '../../i18n/ui';
import { getLocaleMeta } from '../../i18n/locales';

const locale = getLocaleMeta(Astro.currentLocale).code;
---
```

(This becomes the frontmatter fence — the existing comment-only frontmatter block becomes a real script section with these two lines added.)

- [ ] **Step 2: Translate the dialog aria-label**

Find:

```astro
  role="dialog"
  aria-label="Cookie consent"
```

Replace with:

```astro
  role="dialog"
  aria-label={t(locale, 'cookie.ariaLabel')}
```

- [ ] **Step 3: Translate the banner text and privacy link**

Find:

```astro
    <p class="text-[13px] leading-relaxed text-[var(--c-text-muted)]">
      We use cookies to improve your experience and serve relevant ads. By using this site, you agree
      to our use of cookies. Read our <a
        href="/privacy/"
        class="text-[#f59e0b] underline underline-offset-2 hover:text-[#fbbf24] transition-colors"
        >Privacy Policy</a
      >.
    </p>
```

Replace with:

```astro
    <p class="text-[13px] leading-relaxed text-[var(--c-text-muted)]">
      {t(locale, 'cookie.text')} <a
        href="/privacy/"
        class="text-[#f59e0b] underline underline-offset-2 hover:text-[#fbbf24] transition-colors"
        >{t(locale, 'cookie.privacyLinkText')}</a
      >.
    </p>
```

The privacy link stays hardcoded to `/privacy/` (English) regardless of locale — that page isn't translated in this phase, per the spec's non-goals.

- [ ] **Step 4: Translate the buttons**

Find:

```astro
        data-consent="reject"
        class="rounded-md border border-[var(--c-border)] bg-transparent px-3 py-1.5 text-[12px] font-medium text-[var(--c-text-muted)] transition-colors hover:border-[var(--c-border-strong)] hover:text-[var(--c-text)]"
      >
        Reject non-essential
      </button>
      <button
        type="button"
        data-consent="accept"
        class="rounded-md bg-[#f59e0b] px-4 py-1.5 text-[12px] font-semibold text-[#0a0a0a] transition-colors hover:bg-[#fbbf24]"
      >
        Accept
      </button>
```

Replace `Reject non-essential` with `{t(locale, 'cookie.reject')}` and `Accept` with `{t(locale, 'cookie.accept')}`.

- [ ] **Step 5: Build and verify English is unchanged**

Run: `npm run build`, then:

```bash
grep -o 'Read our' dist/index.html
grep -o 'Reject non-essential' dist/index.html
```

Expected: both found.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/CookieConsent.astro
git commit -m "feat(i18n): make CookieConsent locale-aware"
```

---

### Task 9: Layout.astro wiring

**Files:**
- Modify: `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: `HreflangLinks` (Task 4); `getLocaleMeta`, `LOCALES`, `type Locale` from `src/i18n/locales.ts` (Task 1).
- Produces: `<Layout alternates? ... />` — adds `alternates?: Partial<Record<Locale, string>>` prop.

- [ ] **Step 1: Add imports and props**

In `src/layouts/Layout.astro`, add to the imports (after the existing `SiteSchema` import):

```astro
import HreflangLinks from '../components/layout/HreflangLinks.astro';
import { getLocaleMeta, LOCALES, type Locale } from '../i18n/locales';
```

Add `alternates` to the `Props` interface:

```ts
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  alternates?: Partial<Record<Locale, string>>;
}
```

Add `alternates` to the destructured props:

```ts
const {
  title = 'Free Stock Market Simulator | Stockade',
  description = 'A free stock market simulator. Practice day trading, paper & crypto trading with $100K virtual money. No signup required. Stocks, forex, futures & crypto.',
  ogImage = '/og-image.png',
  ogType = 'website',
  canonical,
  alternates,
} = Astro.props;
```

After the existing `canonicalUrl`/`ogImageUrl` computation, add:

```ts
const currentLocale = getLocaleMeta(Astro.currentLocale);
const altOgLocales = LOCALES.filter(
  l => alternates?.[l.code] && l.code !== currentLocale.code
);
```

- [ ] **Step 2: Set `<html lang>` from the registry**

Replace:

```astro
<html lang="en">
```

with:

```astro
<html lang={currentLocale.hreflang}>
```

- [ ] **Step 3: Add `og:locale:alternate` tags**

Find:

```astro
    <meta property="og:locale" content="en_US" />
```

Replace with:

```astro
    <meta property="og:locale" content={currentLocale.ogLocale} />
    {altOgLocales.map(l => <meta property="og:locale:alternate" content={l.ogLocale} />)}
```

- [ ] **Step 4: Render HreflangLinks**

Find:

```astro
    <SiteSchema />
    <slot name="head" />
```

Replace with:

```astro
    <SiteSchema />
    <HreflangLinks alternates={alternates} />
    <slot name="head" />
```

- [ ] **Step 5: Build and verify no regression**

Run: `npm run build`, then:

```bash
grep -o '<html lang="en">' dist/index.html
grep -o 'og:locale' dist/index.html
```

Expected: `<html lang="en">` still present (no `alternates` passed to the homepage yet, so `currentLocale` resolves to English via the `getLocaleMeta` fallback); `og:locale` meta tag still present with no `og:locale:alternate` siblings (empty `altOgLocales`). No hreflang `<link>` tags anywhere yet.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(i18n): wire hreflang, lang, and og:locale:alternate into Layout.astro"
```

---

### Task 10: AppLayout.astro wiring

**Files:**
- Modify: `src/layouts/AppLayout.astro`

**Interfaces:**
- Consumes: `HreflangLinks` (Task 4); `getLocaleMeta`, `LOCALES`, `type Locale` from `src/i18n/locales.ts` (Task 1); `Navbar` (already imported, now accepts `alternates` per Task 6).

- [ ] **Step 1: Add imports and props**

In `src/layouts/AppLayout.astro`, add to the imports (after the existing `SiteSchema` import):

```astro
import HreflangLinks from '../components/layout/HreflangLinks.astro';
import { getLocaleMeta, LOCALES, type Locale } from '../i18n/locales';
```

Add `alternates` to `Props` and the destructure, mirroring Task 9 Step 1:

```ts
interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  alternates?: Partial<Record<Locale, string>>;
}

const {
  title = 'Free Stock Market Simulator | Stockade',
  description = 'Free stock market trading simulator. Practice day trading, paper trading, and crypto with $100K virtual money. No signup required.',
  ogImage = '/og-image.png',
  canonical,
  alternates,
} = Astro.props;
```

After the existing `ogImageUrl` computation, add:

```ts
const currentLocale = getLocaleMeta(Astro.currentLocale);
const altOgLocales = LOCALES.filter(
  l => alternates?.[l.code] && l.code !== currentLocale.code
);
```

- [ ] **Step 2: Set `<html lang>`, og:locale, hreflang — same substitutions as Task 9**

Replace `<html lang="en">` with `<html lang={currentLocale.hreflang}>`.

Replace:

```astro
    <meta property="og:locale" content="en_US" />
```

with:

```astro
    <meta property="og:locale" content={currentLocale.ogLocale} />
    {altOgLocales.map(l => <meta property="og:locale:alternate" content={l.ogLocale} />)}
```

Find:

```astro
    <SiteSchema />
    <slot name="head" />
```

Replace with:

```astro
    <SiteSchema />
    <HreflangLinks alternates={alternates} />
    <slot name="head" />
```

- [ ] **Step 3: Pass alternates through to Navbar**

Find:

```astro
    <Navbar compact />
```

Replace with:

```astro
    <Navbar compact alternates={alternates} />
```

- [ ] **Step 4: Build and verify no regression**

Run: `npm run build`, then:

```bash
grep -o '<html lang="en">' dist/simulator/index.html
```

Expected: found — `/simulator` (which uses `AppLayout`) is unaffected since no page passes `alternates` yet.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/AppLayout.astro
git commit -m "feat(i18n): wire hreflang, lang, and language switcher into AppLayout.astro"
```

---

### Task 11: LiveStats translatable labels

**Files:**
- Modify: `src/components/landing/LiveStats.tsx`

**Interfaces:**
- Produces: `<LiveStats labels?={{ startingBalance, tradableAssets, assetClasses, costToStart }} />` — new optional prop, defaults reproduce the current hardcoded English strings exactly (so existing usage without the prop is unaffected).

The homepage renders `LiveStats` directly below the hero, so a "real" Spanish homepage needs these four stat labels translated too — otherwise the PoC would visibly mix English labels into Spanish page. This wasn't in the original file list but is required for the approved PoC goal (a genuinely translated homepage), and it's a small, self-contained addition.

- [ ] **Step 1: Add the `labels` prop**

Replace the full contents of `src/components/landing/LiveStats.tsx`:

```tsx
interface Labels {
  startingBalance: string;
  tradableAssets: string;
  assetClasses: string;
  costToStart: string;
}

const DEFAULT_LABELS: Labels = {
  startingBalance: 'Starting Balance',
  tradableAssets: 'Tradable Assets',
  assetClasses: 'Asset Classes',
  costToStart: 'Cost to Start',
};

interface Props {
  labels?: Labels;
}

export default function LiveStats({ labels = DEFAULT_LABELS }: Props) {
  const stats = [
    { label: labels.startingBalance, value: '$100,000' },
    { label: labels.tradableAssets,  value: '29'       },
    { label: labels.assetClasses,    value: '4'         },
    { label: labels.costToStart,     value: '$0'        },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
      {stats.map(s => (
        <div key={s.label} className="text-center">
          <div className="text-2xl sm:text-3xl font-mono font-semibold text-[#f5f5f5] tabular-nums">
            {s.value}
          </div>
          <div className="text-[12px] text-[#666666] mt-1 font-mono uppercase tracking-wider">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Build and verify English homepage is unchanged**

Run: `npm run build`, then:

```bash
grep -o 'Starting Balance' dist/index.html
```

Expected: found — `index.astro` calls `<LiveStats client:load />` with no `labels` prop, so it still uses `DEFAULT_LABELS` (identical English text as before).

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/LiveStats.tsx
git commit -m "feat(i18n): let LiveStats accept translated stat labels"
```

---

### Task 12: Proof-of-concept — Spanish homepage

**Files:**
- Create: `src/i18n/alternates.ts`
- Modify: `src/pages/index.astro`
- Create: `src/pages/es/index.astro`

**Interfaces:**
- Consumes: everything from Tasks 1–11 (`LOCALES`/`getLocaleMeta`, `t`, `Layout` with `alternates`, `Navbar` with `alternates`, `LiveStats` with `labels`).
- Produces: `HOME_ALTERNATES: Record<'en'|'es', string>` from `src/i18n/alternates.ts`, consumed by both homepage variants.

- [ ] **Step 1: Create the centralized alternates constant**

Create `src/i18n/alternates.ts`:

```ts
// One alternates object per logical page, imported by every locale variant of
// that page, so adding a translation later means editing this file once
// instead of updating every existing sibling page to list the new one.
export const HOME_ALTERNATES = {
  en: '/',
  es: '/es/',
} as const;
```

- [ ] **Step 2: Wire the English homepage into the alternates set**

In `src/pages/index.astro`, add an import (after the existing `LiveStats` import):

```astro
import { HOME_ALTERNATES } from '../i18n/alternates';
```

Find the `<Layout ...>` opening tag:

```astro
<Layout
  title="Stockade | Free Stock Market Simulator"
  description="A free stock market simulator with fake money. Practice day & paper trading with $100K virtual funds — stocks, crypto, forex, futures. No signup required."
>
```

Replace with:

```astro
<Layout
  title="Stockade | Free Stock Market Simulator"
  description="A free stock market simulator with fake money. Practice day & paper trading with $100K virtual funds — stocks, crypto, forex, futures. No signup required."
  alternates={HOME_ALTERNATES}
>
```

Find `<Navbar />` (in the page body) and replace with:

```astro
  <Navbar alternates={HOME_ALTERNATES} />
```

- [ ] **Step 3: Build and verify the English page now advertises both hreflang alternates**

Run: `npm run build`, then:

```bash
grep -o 'hreflang="en"' dist/index.html
grep -o 'hreflang="es"' dist/index.html
grep -o 'hreflang="x-default"' dist/index.html
```

Expected: all three found. `HOME_ALTERNATES` already contains both the `en` and `es` keys (it was written as one object in Step 1), and `HreflangLinks` doesn't check whether the target route actually exists — it just renders whatever `alternates` data it's given. So `dist/index.html` already links to `/es/` here, one step before that page exists. That's fine: this build's `dist/` output is a scratch artifact, not something being deployed, and Step 4 immediately creates the missing page in this same task — by the time this task is committed (Step 6), both sides of the link are real. If this transient state bothers you, treat it as confirmation the wiring from Task 9 works, not as a bug to fix.

- [ ] **Step 4: Write the Spanish homepage**

Create `src/pages/es/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import Navbar from '../../components/layout/Navbar.astro';
import Footer from '../../components/layout/Footer.astro';
import TickerTape from '../../components/landing/TickerTape.tsx';
import LiveStats from '../../components/landing/LiveStats.tsx';
import { HOME_ALTERNATES } from '../../i18n/alternates';
import { t } from '../../i18n/ui';

const locale = 'es' as const;

// Single source of truth for the FAQ: the visible section below and the
// FAQPage JSON-LD are both generated from this array. Mirrors the structure
// of the English src/pages/index.astro — see that file for why the schema is
// generated rather than hand-duplicated.
const faqs = [
  {
    q: '¿Stockade es completamente gratis?',
    a: 'Sí — 100% gratis para siempre. Todas las funciones, todas las clases de activos, todas las herramientas. Sin registro, sin tarjeta de crédito, sin suscripción requerida.',
  },
  {
    q: '¿Pueden los estudiantes usar Stockade como simulador de mercado de valores?',
    a: 'Por supuesto. Stockade es uno de los mejores simuladores gratuitos de mercado de valores para estudiantes. No necesita instalación ni cuenta, lo que lo hace perfecto para uso en el aula, cursos universitarios de finanzas y aprendizaje autodirigido.',
  },
  {
    q: '¿Stockade admite cripto, forex y futuros?',
    a: 'Sí. Stockade cubre acciones, criptomonedas, pares de forex y contratos de futuros (NQ, ES, CL, GC) — explóralos todos en la <a href="/markets">página de Mercados</a>.',
  },
  {
    q: '¿Stockade es un simulador de paper trading o de day trading?',
    a: 'Ambos. Avanza por una sesión completa vela por vela a tu propio ritmo (paper trading) o transmite precios en vivo con ticks de 800ms (day trading) — todo con $100,000 en dinero virtual.',
  },
  {
    q: '¿Qué es un simulador de mercado de valores?',
    a: 'Un simulador de mercado de valores es una plataforma de trading virtual que replica las condiciones reales del mercado usando dinero ficticio, permitiéndote practicar la compra y venta de acciones, cripto, forex y futuros sin riesgo financiero. Stockade te da $100,000 en capital virtual y herramientas de nivel profesional — gráficos de velas, indicadores técnicos y múltiples tipos de órdenes — directamente en tu navegador, sin necesidad de registro.',
  },
  {
    q: '¿Qué puedo hacer con un simulador de mercado de valores?',
    a: 'Practicar la compra y venta de acciones, cripto, pares de forex y contratos de futuros; probar estrategias contra la acción del precio simulada; <a href="/blog/analyze-trading-performance-metrics">seguir tu rendimiento</a> con curvas de capital, tasa de acierto y métricas de drawdown; y desarrollar el reconocimiento de patrones y la disciplina necesarios para los mercados reales — todo sin riesgo.',
  },
  {
    q: '¿El simulador de mercado de valores es real o ficticio?',
    a: 'El dinero es ficticio — capital totalmente virtual, con un saldo inicial de $100,000, por lo que el riesgo financiero es cero. Los precios y gráficos usan datos de mercado simulados y realistas, modelados según el comportamiento real de un bróker, de modo que la mecánica de trading, los patrones de gráficos y los tipos de órdenes reflejan lo que usarías en una plataforma real. El desarrollo de habilidades es genuino, aunque el dinero no lo sea.',
  },
  {
    q: '¿Cómo funciona un simulador de mercado de valores?',
    a: 'Stockade genera datos de precios realistas para 29 activos entre acciones, cripto, forex y futuros. Colocas órdenes a través de un panel de órdenes completo — órdenes de mercado, límite, stop-loss, take-profit y bracket OCO — y el simulador las ejecuta al instante. Tus ganancias y pérdidas virtuales, curva de capital, tasa de acierto y métricas de rendimiento se registran automáticamente en tu navegador, sin necesidad de cuenta.',
  },
  {
    q: '¿Cuáles son los riesgos de usar un simulador de mercado de valores?',
    a: 'El principal riesgo es desarrollar hábitos que no tienen en cuenta factores del mercado real, como el slippage, las restricciones de liquidez, las comisiones del bróker y la presión psicológica del dinero real. Stockade está diseñado para desarrollar habilidades y para la educación, no como garantía de resultados en trading real. Cuando pases a los mercados reales, empieza con posiciones pequeñas para ajustarte a las diferencias emocionales y de ejecución.',
  },
  {
    q: '¿Cuáles son las limitaciones del simulador?',
    a: 'Stockade usa datos de precios simulados en lugar de un feed de mercado en vivo, por lo que los spreads exactos del mundo real, el slippage y los gaps fuera de horario se aproximan en lugar de reproducirse con precisión. Tampoco puede replicar por completo la presión psicológica de arriesgar capital real. Piénsalo como un campo de entrenamiento que cubre todas las habilidades técnicas, reconociendo que la disciplina emocional se sigue desarrollando en los mercados reales.',
  },
  {
    q: '¿Cuál es la principal ventaja de un simulador?',
    a: 'Riesgo financiero cero mientras desarrollas habilidades de trading reales. Puedes probar estrategias, cometer errores y desarrollar disciplina sin perder dinero. Stockade te da $100,000 en capital virtual y herramientas profesionales — gráficos de velas, EMA/VWAP/RSI/MACD, un panel de órdenes completo y un panel de analítica detallado — el mismo entorno que un bróker real, totalmente gratis y sin consecuencias.',
  },
];

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '');

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://stockademarketsim.com/es/#faq',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: stripTags(a) },
  })),
};

const faqSchemaJson = JSON.stringify(faqSchema).replace(/</g, '\\u003c');

const liveStatsLabels = {
  startingBalance: t(locale, 'home.stats.startingBalance'),
  tradableAssets: t(locale, 'home.stats.tradableAssets'),
  assetClasses: t(locale, 'home.stats.assetClasses'),
  costToStart: t(locale, 'home.stats.costToStart'),
};
---

<Layout
  title="Stockade | Simulador de Mercado de Valores Gratis"
  description="Simulador de mercado de valores gratis con dinero virtual. Practica day trading y paper trading — acciones, cripto, forex y futuros. Sin registro."
  alternates={HOME_ALTERNATES}
>
  <Fragment slot="head">
    <!-- The WebSite and Organization entities live in SiteSchema.astro and are
         emitted on every page by the base layout. This SoftwareApplication node
         reuses the same @id/url as the English page — it describes one entity
         (the app), the same way SiteSchema's shared nodes do regardless of
         which locale renders them — with description/featureList translated. -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "@id": "https://stockademarketsim.com/#app",
            "name": "Simulador de Mercado de Valores Stockade",
            "url": "https://stockademarketsim.com/",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Simulador de mercado de valores gratuito en línea para hacer paper trading de acciones, cripto, forex y futuros. Sin registro requerido.",
            "screenshot": "https://stockademarketsim.com/web-app-manifest-512x512.png",
            "featureList": [
              "Gráficos de velas simulados con volumen",
              "Indicadores EMA, VWAP, RSI, MACD",
              "Órdenes de mercado y límite con brackets OCO de stop-loss / take-profit",
              "Paper trading con $100,000 de saldo virtual",
              "Panel de analítica con curva de capital",
              "Acciones, cripto, forex y futuros"
            ],
            "publisher": { "@id": "https://stockademarketsim.com/#organization" },
            "isPartOf": { "@id": "https://stockademarketsim.com/#website" }
          }
        ]
      }
    </script>
    {/* Generated from the `faqs` array above — see index.astro for why. */}
    <script type="application/ld+json" is:inline set:html={faqSchemaJson} />
  </Fragment>

  <Navbar alternates={HOME_ALTERNATES} />

  <!-- ── Hero ── -->
  <section class="relative overflow-hidden mesh-gradient">
    <div
      class="absolute inset-0 opacity-[0.03]"
      style="background-image: linear-gradient(var(--c-text) 1px, transparent 1px), linear-gradient(90deg, var(--c-text) 1px, transparent 1px); background-size: 40px 40px;"
    ></div>

    <div class="relative max-w-[1100px] mx-auto px-6 pt-24 pb-28 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--c-amber-bg)] border border-[var(--c-amber-dim)] text-[#f59e0b] text-[12px] font-mono mb-8">
        <span class="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
        Gratis · Sin Registro · Saldo Virtual de $100,000
      </div>

      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
        Practica el mercado.
        <br />
        <span class="gradient-text">Domina el juego.</span>
      </h1>

      <p class="text-lg sm:text-xl text-[var(--c-text-muted)] max-w-[600px] mx-auto mb-10 leading-relaxed">
        El simulador de trading gratuito de acciones y criptomonedas con datos de mercado
        simulados realistas. Sin registro. Sin riesgo. Solo trading virtual.
      </p>

      <div class="flex flex-wrap justify-center gap-3 mb-16">
        <a
          href="/simulator"
          class="px-6 py-3 rounded-full bg-[#f59e0b] text-[#0a0a0a] font-semibold text-[15px] hover:bg-[#fbbf24] transition-colors"
        >
          Empezar a Operar Gratis →
        </a>
        <a
          href="/markets"
          class="px-6 py-3 rounded-full bg-[var(--c-bg-muted)] text-[var(--c-text)] font-semibold text-[15px] border border-[var(--c-border)] hover:bg-[var(--c-surface-2)] transition-colors"
        >
          Ver Mercados
        </a>
      </div>

      <LiveStats client:load labels={liveStatsLabels} />
    </div>
  </section>

  <!-- ── App preview ── -->
  <section class="border-y border-[var(--c-border)] bg-[var(--c-bg-soft)] px-6 py-16">
    <div class="max-w-[1100px] mx-auto">
      <div class="rounded-xl overflow-hidden border border-[var(--c-border)] shadow-2xl">
        <div class="flex items-center gap-2 px-4 py-3 bg-[var(--c-bg-muted)] border-b border-[var(--c-border)]">
          <span class="w-3 h-3 rounded-full bg-[#ef4444]"></span>
          <span class="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
          <span class="w-3 h-3 rounded-full bg-[#22c55e]"></span>
          <span class="ml-3 text-[12px] font-mono text-[var(--c-text-subtle)]">stockademarketsim.com/simulator — APXL 1M</span>
          <span class="ml-auto text-[10px] font-mono text-[var(--c-text-subtle)] border border-[var(--c-border)] px-2 py-0.5 rounded tracking-wider">VISTA DE MUESTRA</span>
        </div>
        <div class="bg-[var(--c-bg-subtle)] relative overflow-hidden" style="height: 320px;">
          <svg viewBox="0 0 1200 320" class="w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="64" x2="1200" y2="64" stroke="var(--c-border)" stroke-width="1"/>
            <line x1="0" y1="128" x2="1200" y2="128" stroke="var(--c-border)" stroke-width="1"/>
            <line x1="0" y1="192" x2="1200" y2="192" stroke="var(--c-border)" stroke-width="1"/>
            <line x1="0" y1="256" x2="1200" y2="256" stroke="var(--c-border)" stroke-width="1"/>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="M0,240 C80,220 160,200 240,195 S400,165 480,150 S640,125 720,118 S900,100 960,95 S1100,80 1200,70"
              stroke="#22c55e" stroke-width="2" fill="none" opacity="0.9"/>
            <path d="M0,240 C80,220 160,200 240,195 S400,165 480,150 S640,125 720,118 S900,100 960,95 S1100,80 1200,70 V320 H0 Z"
              fill="url(#g1)"/>
          </svg>

          <div class="absolute top-4 left-4 rounded-lg px-3 py-2 border border-[var(--c-border)] backdrop-blur-sm" style="background-color: var(--c-overlay);">
            <div class="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-widest mb-0.5">APXL · 1M</div>
            <div class="text-[22px] font-mono font-semibold text-[var(--c-text)]">$187.42</div>
            <div class="text-[13px] font-mono text-[#22c55e]">+1.23 (+0.66%)</div>
          </div>

          <div class="absolute top-4 right-4 w-[160px] rounded-lg border border-[var(--c-border)] p-3" style="background-color: var(--c-overlay);">
            <div class="text-[10px] font-mono text-[var(--c-text-subtle)] uppercase tracking-widest mb-2">Orden</div>
            <div class="flex gap-1 mb-2">
              <div class="flex-1 py-1.5 bg-[var(--c-green-bg)] border border-[var(--c-green-dim)] text-[#22c55e] text-[11px] font-mono text-center rounded">COMPRAR</div>
              <div class="flex-1 py-1.5 bg-[var(--c-bg-muted)] border border-[var(--c-border)] text-[var(--c-text-subtle)] text-[11px] font-mono text-center rounded">VENDER</div>
            </div>
            <div class="text-[10px] font-mono text-[var(--c-text-subtle)] mb-1">Capital</div>
            <div class="text-[14px] font-mono font-semibold text-[#22c55e]">$102,340</div>
          </div>

          <div class="absolute bottom-4 left-4 flex gap-2">
            <div class="bg-[var(--c-green-bg)] border border-[var(--c-green-dim)] rounded px-2.5 py-1.5">
              <div class="text-[10px] font-mono text-[var(--c-text-subtle)]">G/P</div>
              <div class="text-[15px] font-mono font-semibold text-[#22c55e]">+$2,340</div>
            </div>
            <div class="bg-[var(--c-amber-bg)] border border-[var(--c-amber-dim)] rounded px-2.5 py-1.5">
              <div class="text-[10px] font-mono text-[var(--c-text-subtle)]">Tasa de Acierto</div>
              <div class="text-[15px] font-mono font-semibold text-[#f59e0b]">68%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Features ── -->
  <section class="py-24 px-6 bg-[var(--c-bg)]">
    <div class="max-w-[1100px] mx-auto">
      <div class="text-center mb-14">
        <div class="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] mb-3">Por qué Stockade</div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--c-text)]">Todo lo que un trader serio necesita.</h2>
        <p class="mt-4 text-[var(--c-text-muted)] text-lg max-w-[480px] mx-auto">
          Diseñado para aprender, no para gamificar. Herramientas profesionales sin el precio.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: '📈', title: 'Gráficos de Velas Reales', desc: 'Velas completas con volumen e indicadores EMA, VWAP, RSI y MACD — las mismas herramientas que usan los profesionales.' },
          { icon: '⚡', title: 'Ejecución Instantánea de Órdenes', desc: 'Órdenes de mercado, límite, stop-loss, take-profit y OCO ejecutadas al instante.' },
          { icon: '⌨️', title: 'Atajos de Teclado', desc: 'B para comprar, S para vender, F para cerrar posición. Opera a la velocidad del pensamiento sin tocar el mouse.' },
          { icon: '📊', title: 'Panel de Analítica', desc: 'Tasa de acierto, factor de beneficio, ganancia/pérdida promedio, curva de capital, drawdown y mapas de calor por hora del día.' },
          { icon: '💼', title: 'Multi-Activo', desc: 'Acciones, criptomonedas, pares de forex y futuros — todo en un solo simulador.' },
          { icon: '📱', title: 'Optimizado para Móvil', desc: 'Totalmente responsive. Opera desde tu teléfono, tablet o computadora con las mismas funciones.' },
          { icon: '🆓', title: '100% Gratis para Siempre', desc: 'Todas las funciones. Todos los activos. Sin registro. Sin pruebas. Sin suscripciones. Solo empieza.' },
        ].map(f => (
          <div class="bg-[var(--c-bg-soft)] border border-[var(--c-border)] rounded-xl p-5 hover:border-[var(--c-border-strong)] transition-colors group">
            <div class="text-2xl mb-3">{f.icon}</div>
            <h3 class="text-[15px] font-semibold text-[var(--c-text)] mb-2 group-hover:text-[#f59e0b] transition-colors">{f.title}</h3>
            <p class="text-[13px] text-[var(--c-text-subtle)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- ── Asset coverage ── -->
  <section class="py-20 px-6 bg-[var(--c-bg-soft)] border-y border-[var(--c-border)]">
    <div class="max-w-[1100px] mx-auto">
      <div class="text-center mb-12">
        <div class="text-[11px] font-mono uppercase tracking-widest text-[#22c55e] mb-3">Activos Disponibles</div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--c-text)]">Opera con todo.</h2>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Acciones', sub: 'Renta Variable · 14 Tickers',   icon: '📈', color: '#3b82f6' },
          { label: 'Cripto',   sub: 'Tokens y Monedas · 8 Activos',  icon: '🪙', color: '#f59e0b' },
          { label: 'Forex',    sub: 'EUR/USD · GBP/USD · USD/JPY',   icon: '💱', color: '#22c55e' },
          { label: 'Futuros',  sub: 'NQ · ES · CL · GC',             icon: '🔮', color: '#8b5cf6' },
        ].map(a => (
          <div class="bg-[var(--c-bg)] border border-[var(--c-border)] rounded-xl p-5 text-center hover:border-[var(--c-border-strong)] transition-colors">
            <div class="text-3xl mb-3">{a.icon}</div>
            <div class="text-[16px] font-semibold mb-1" style={`color: ${a.color}`}>{a.label}</div>
            <div class="text-[12px] font-mono text-[var(--c-text-subtle)]" set:html={a.sub}></div>
          </div>
        ))}
      </div>
      <p class="text-center text-[11px] font-mono text-[var(--c-text-subtle)] mt-6">
        Todos los tickers son activos simulados ficticios y no representan valores, criptomonedas ni instrumentos negociables reales.
      </p>
    </div>
  </section>

  <!-- ── SEO Content ── -->
  <section class="py-24 px-6 bg-[var(--c-bg-soft)] border-t border-[var(--c-border)]">
    <div class="max-w-[800px] mx-auto">
      <div class="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] mb-4">Acerca de Stockade</div>
      <article class="prose-stockade">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--c-text)] mb-6">
          Practica en el mercado sin arriesgar dinero real
        </h2>

        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed mb-6">
Stockade es un <a href="/simulator" class="text-[#f59e0b] hover:underline">simulador de mercado de valores</a> que abres en una pestaña del navegador y empiezas a usar unos diez segundos después. Recibes <strong class="text-[var(--c-text)]">$100,000 en dinero virtual</strong> y un entorno de trading completo que cubre acciones, cripto, forex y futuros. No hay cuenta que crear, ni tarjeta que ingresar, ni nada que instalar. Si haces una operación desastrosa, lo único que pierdes es un número en la pantalla — para eso sirve practicar.
        </p>

        <h3 class="text-xl font-bold text-[var(--c-text)] mb-3 mt-8">
          Por qué la mayoría de los juegos de trading se quedan cortos
        </h3>
        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed mb-6">
          Muchos simuladores priorizan el enganche por encima del realismo. Eliminan los indicadores, los tipos de órdenes y las métricas de riesgo, y lo que queda es un juego sobre ver un número subir — divertido por una tarde, pero que no te enseña casi nada que sobreviva al contacto con un bróker real. Nosotros hicimos lo contrario. Stockade te da gráficos de velas con histogramas de volumen, superposiciones de EMA 9/20/50, VWAP, RSI y MACD, además de un panel de órdenes con entradas de mercado y límite, y niveles de stop-loss / take-profit que funcionan como un bracket OCO. La idea es que los hábitos que desarrolles aquí sigan funcionando cuando pases a una plataforma real — consulta <a href="/blog/paper-trading-guide" class="text-[#f59e0b] hover:underline">la guía de paper trading</a> para saber cómo hacer que esa transición se mantenga.
        </p>

        <h3 class="text-xl font-bold text-[var(--c-text)] mb-3 mt-8">
          Dos formas de practicar: en vivo y repetición
        </h3>
        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed mb-6">
          El modo en vivo transmite seis activos a la vez con precios que se actualizan cada 800 milisegundos, para que puedas practicar day trading contra una cinta rápida y descubrir cómo reaccionas realmente bajo presión. El modo repetición hace lo contrario — avanzas por una sesión completa vela por vela, tomándote el tiempo que quieras en cada decisión. La mayoría usa el modo en vivo para desarrollar reflejos y el modo repetición para reconocer patrones — para practicar enfocado únicamente en leer formaciones en lugar de en las ganancias y pérdidas, el <a href="/chart-simulator" class="text-[#f59e0b] hover:underline">Simulador de Gráficos</a> avanza por patrones de velas de la misma manera. Los simuladores de paper trading de los brókers suelen exigir registro y una cuenta real vinculada antes de dejarte colocar una sola orden. Aquí, simplemente abres la página.
        </p>

        <h3 class="text-xl font-bold text-[var(--c-text)] mb-3 mt-8">
          Acciones, cripto, forex y futuros en un solo lugar
        </h3>
        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed mb-6">
          Hay 14 tickers de acciones con un comportamiento de precio realista, 8 activos cripto que se mueven con la volatilidad que esperarías del activo real, pares de divisas mayores y menores, y cuatro contratos de futuros — NQ, ES, CL y GC. Ese rango importa más de lo que parece: una estrategia que se ve brillante en una acción de movimiento lento a menudo se desmorona en un par de divisas o un contrato de futuros, y tener todo en <a href="/markets" class="text-[#f59e0b] hover:underline">una sola plataforma</a> hace que sea fácil descubrirlo.
        </p>

        <h3 class="text-xl font-bold text-[var(--c-text)] mb-3 mt-8">
          Revisa lo que realmente pasó
        </h3>
        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed mb-6">
          Colocar operaciones es la mitad fácil; la mitad útil es analizar los resultados después. El <a href="/analytics" class="text-[#f59e0b] hover:underline">panel de analítica</a> lee tu historial de operaciones e informa la curva de capital, la tasa de acierto, el factor de beneficio, la ganancia y pérdida promedio, el drawdown máximo, y un mapa de calor que muestra en qué horas del día tus operaciones realmente funcionaron. Como no hay nada que instalar ni una barrera de registro, todo ese ciclo ocurre en una pestaña del navegador — lo que también lo hace viable para un salón de clases o un grupo de estudio, donde hacer que todos completen un formulario de registro suele ser la parte difícil.
        </p>

        <h3 class="text-xl font-bold text-[var(--c-text)] mb-3 mt-8">
          Sin muros de pago, sin nivel premium
        </h3>
        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed mb-4">
          Muchas plataformas guardan sus mejores herramientas detrás de una suscripción, o te obligan a entregar un correo electrónico antes de dejarte colocar una sola operación. Stockade no. Todo aquí está incluido, de forma permanente:
        </p>
        <ul class="space-y-2 mb-6 ml-4">
          {[
            'Gráficos de velas completos con volumen',
            'Indicadores profesionales: EMA, VWAP, RSI, MACD',
            'Panel de órdenes: entradas de mercado y límite, brackets OCO de stop-loss / take-profit',
            'Analítica de rendimiento con curvas de capital y seguimiento de drawdown',
            'Soporte completo para móvil y tablet',
          ].map(item => (
            <li class="flex items-start gap-2 text-[15px] text-[var(--c-text-muted)]">
              <span class="text-[#22c55e] mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p class="text-[var(--c-text-muted)] text-[16px] leading-relaxed">
          Sin pruebas, sin nivel freemium, sin ventas adicionales, sin captura de correo. Abre el simulador y empieza a operar.
        </p>
      </article>
    </div>
  </section>

  <!-- ── FAQ ── -->
  <section id="faq" class="py-20 px-6 bg-[var(--c-bg)] border-t border-[var(--c-border)]">
    <div class="max-w-[800px] mx-auto">
      <div class="text-[11px] font-mono uppercase tracking-widest text-[#f59e0b] mb-4">Preguntas Frecuentes</div>
      <h2 class="text-3xl font-bold tracking-tight text-[var(--c-text)] mb-10">Preguntas comunes</h2>
      <div class="space-y-6">
        {faqs.map(({ q, a }) => (
          <div class="border border-[var(--c-border)] rounded-xl p-5 bg-[var(--c-bg-soft)]">
            <h3 class="text-[15px] font-semibold text-[var(--c-text)] mb-2">{q}</h3>
            <p class="text-[14px] text-[var(--c-text-subtle)] leading-relaxed [&_a]:text-[#f59e0b] [&_a]:hover:underline" set:html={a} />
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- ── CTA band ── -->
  <section class="py-24 px-6 bg-[var(--c-bg-soft)] border-t border-[var(--c-border)] text-center mesh-gradient">
    <div class="max-w-[640px] mx-auto">
      <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-5 text-[var(--c-text)]">
        ¿Listo para empezar a operar?
      </h2>
      <p class="text-[var(--c-text-muted)] text-lg mb-8">
        Sin tarjeta de crédito. Sin registro. $100,000 en saldo virtual esperándote.
      </p>
      <a
        href="/simulator"
        class="inline-block px-8 py-4 rounded-full bg-[#f59e0b] text-[#0a0a0a] font-bold text-[16px] hover:bg-[#fbbf24] transition-colors"
      >
        Iniciar el Simulador →
      </a>
    </div>
  </section>

  <div class="h-10"></div>
  <Footer />

  <div class="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--c-border)]">
    <TickerTape client:load />
  </div>
</Layout>
```

The FAQ, features, and article body links (`/markets`, `/simulator`, `/chart-simulator`, `/analytics`, `/blog/...`) deliberately point at the **English** versions of those pages, since none of them exist under `/es/` yet — this matches the spec's non-goal that only the homepage is translated in this phase.

- [ ] **Step 5: Build and verify the full round trip**

Run: `npm run build`, then:

```bash
grep -o 'lang="es"' dist/es/index.html
grep -o 'hreflang="es"' dist/index.html
grep -o 'hreflang="en"' dist/es/index.html
grep -o 'hreflang="x-default"' dist/es/index.html
grep -o 'og:locale" content="es_ES"' dist/es/index.html
grep -o 'og:locale:alternate" content="es_ES"' dist/index.html
grep -o 'Simulador de Trading' dist/es/index.html
grep -o 'Todos los derechos reservados' dist/es/index.html
grep -o 'Balance Inicial' dist/es/index.html
```

Expected: every one of these greps returns a match. This confirms: `<html lang>` is correct on the Spanish page; both pages carry reciprocal hreflang links plus `x-default`; both carry each other's `og:locale`/`og:locale:alternate`; the Navbar, Footer, and LiveStats labels are genuinely translated on `/es/`.

Also check the `compressHTML` whitespace gotcha against the inline `<strong>` in the first SEO paragraph:

```bash
grep -o 'después. Recibes' dist/es/index.html
```

Expected: found, with the space intact (not `despuésRecibes` or similar joined text) — confirms the space before `<strong>` survived compression because it's on the same source line as the tag.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/alternates.ts src/pages/index.astro src/pages/es/index.astro
git commit -m "feat(i18n): translate the homepage into Spanish as the i18n infra proof-of-concept"
```

---

### Task 13: Full-site verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: all tests pass, including the new `src/i18n/locales.test.ts` and `src/i18n/ui.test.ts`.

- [ ] **Step 2: Run astro check**

Run: `npx astro check`
Expected: exit 1 with exactly the one pre-existing error at `ChartSimulator.tsx:670` (lightweight-charts marker generics) and no other errors. If any new error appears, fix it before continuing.

- [ ] **Step 3: Full production build**

Run: `npm run build`
Expected: succeeds with no errors or warnings beyond the known baseline.

- [ ] **Step 4: Verify every existing (untouched) page still renders in English with no hreflang noise**

```bash
grep -L 'hreflang' dist/about/index.html dist/simulator/index.html dist/markets/index.html dist/analytics/index.html dist/chart-simulator/index.html dist/blog/index.html dist/privacy/index.html dist/terms/index.html dist/disclaimer/index.html dist/contact/index.html
```

Expected: `grep -L` (files with **no** match) lists all ten paths — none of these pages pass an `alternates` prop, so `HreflangLinks` should render nothing on any of them, and `LanguageSwitcher` inside their `Navbar` should be similarly silent.

- [ ] **Step 5: Verify the sitemap**

```bash
grep -A3 '<loc>https://stockademarketsim.com/</loc>' dist/sitemap.xml
grep -A3 '<loc>https://stockademarketsim.com/es/</loc>' dist/sitemap.xml
```

Expected: both URL entries exist, and each carries `xhtml:link` alternate entries referencing the other (and itself) with `hreflang="es"` / `hreflang="en"` matching the page-level `<link>` tags exactly — no `es-ES`/`ja-JP`-style region tags anywhere in the sitemap output.

- [ ] **Step 6: Manual spot-check via preview (optional but recommended)**

Per `CLAUDE.md`'s Windows workaround, `astro dev --background` doesn't work here, so use build + preview instead:

```powershell
npm run build
Start-Job -ScriptBlock { Set-Location "C:\Users\kanis\Desktop\AI Side Hustles\Stockade"; npm run preview }
```

Then in a **separate** tool call (jobs don't survive across calls):

```powershell
Invoke-WebRequest http://localhost:4321/ -UseBasicParsing | Select-Object -ExpandProperty Content | Select-String 'Start Trading'
Invoke-WebRequest http://localhost:4321/es/ -UseBasicParsing | Select-Object -ExpandProperty Content | Select-String 'Empezar a Operar'
```

Stop the server afterward: `Get-Job | Stop-Job`.

- [ ] **Step 7: Confirm no deploy has happened**

```bash
git log --oneline -1
git status
```

Expected: working tree is clean (everything committed task-by-task), and no `wrangler pages deploy` was ever run in this plan — every verification step above used `npm run build`/`preview` only. Do not run `npm run deploy` unless the user explicitly asks for it in a future session.

- [ ] **Step 8: Final commit (if anything is outstanding)**

If Steps 1–6 required any fixes, commit them now with a message describing what was fixed. If nothing needed fixing, this task produces no commit — just the verification record above.
