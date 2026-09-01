import { DEFAULT_LOCALE, type Locale } from './locales';

// One alternates object per logical page, imported by every locale variant of
// that page, so adding a translation later means editing this file once
// instead of updating every existing sibling page to list the new one.
export const HOME_ALTERNATES = {
  en: '/',
  es: '/es/',
} as const;

export const CONTACT_ALTERNATES = {
  en: '/contact/',
  es: '/es/contact/',
} as const;

export const MARKETS_ALTERNATES = {
  en: '/markets/',
  es: '/es/markets/',
} as const;

export const ABOUT_ALTERNATES = {
  en: '/about/',
  es: '/es/about/',
} as const;

export const ANALYTICS_ALTERNATES = {
  en: '/analytics/',
  es: '/es/analytics/',
} as const;

export const SIMULATOR_ALTERNATES = {
  en: '/simulator/',
  es: '/es/simulator/',
} as const;

export const CHART_SIMULATOR_ALTERNATES = {
  en: '/chart-simulator/',
  es: '/es/chart-simulator/',
} as const;

// Covers only the /blog/ index — individual post alternates are computed
// per-post in the [slug] routes (only some posts have a translated sibling
// at any given time) rather than hand-listed here.
export const BLOG_ALTERNATES = {
  en: '/blog/',
  es: '/es/blog/',
} as const;

// Every page-alternates constant above, in one place, so shared chrome
// (Navbar/Footer) can look up "does this destination have a translation for
// the current locale" without hand-maintaining a second list that could drift
// from the per-page constants themselves. A page's alternates constant existing
// above is not enough on its own — it must be added here too, or
// localizedHref() will keep resolving to the English URL even after the
// Spanish page is live.
const REGISTRY: Partial<Record<Locale, string>>[] = [
  HOME_ALTERNATES,
  CONTACT_ALTERNATES,
  MARKETS_ALTERNATES,
  ABOUT_ALTERNATES,
  ANALYTICS_ALTERNATES,
  SIMULATOR_ALTERNATES,
  CHART_SIMULATOR_ALTERNATES,
  BLOG_ALTERNATES,
];

/**
 * Given an English site-relative path (with or without trailing slash) and a
 * target locale, returns the localized path if a translation is registered
 * above, otherwise returns the English path unchanged. Used by Navbar/Footer
 * so their nav links stay correct as pages are incrementally translated,
 * without hardcoding per-link locale logic.
 */
export function localizedHref(enPath: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return enPath;
  const normalized = enPath.endsWith('/') ? enPath : `${enPath}/`;
  const match = REGISTRY.find(alt => alt.en === normalized);
  return match?.[locale] ?? enPath;
}
