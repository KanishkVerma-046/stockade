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
    expect(t('it', 'nav.simulator')).toBe(translations.en['nav.simulator']);
  });

  it('falls back to English for every key in an untranslated locale', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(t('it', key)).toBe(translations.en[key]);
    }
  });

  it('has a complete Spanish translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.es[key]).toBeDefined();
    }
  });

  it('has a complete Portuguese translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.pt[key]).toBeDefined();
    }
  });

  it('has a complete Japanese translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.ja[key]).toBeDefined();
    }
  });

  it('has a complete French translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.fr[key]).toBeDefined();
    }
  });

  it('has a complete German translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.de[key]).toBeDefined();
    }
  });

  it('has a complete Korean translation for every English key', () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.ko[key]).toBeDefined();
    }
  });
});
