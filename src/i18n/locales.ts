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
