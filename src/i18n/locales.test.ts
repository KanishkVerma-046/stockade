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
