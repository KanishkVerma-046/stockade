import { describe, it, expect } from 'vitest';
import { uiCoverage } from './ui-coverage';

const en = { 'nav.home': 'Home', 'markets.search': 'Search', 'markets.col.price': 'Price' };

describe('uiCoverage', () => {
  it('passes a complete locale that has every base key', () => {
    const [r] = uiCoverage({ en, es: { ...en } }, 'en', {});
    expect(r).toMatchObject({ locale: 'es', complete: true, pending: [], violations: [] });
  });

  it('fails a complete locale that is missing any key', () => {
    const [r] = uiCoverage({ en, es: { 'nav.home': 'Inicio', 'markets.search': 'Buscar' } }, 'en', {});
    expect(r.violations).toEqual(['markets.col.price']);
  });

  it('allows a pending locale to miss keys under its declared prefixes only', () => {
    const [r] = uiCoverage({ en, pt: { 'nav.home': 'Início' } }, 'en', { pt: ['markets.'] });
    expect(r).toMatchObject({ complete: false, pending: ['markets.search', 'markets.col.price'], violations: [] });
  });

  it('still fails a pending locale that regresses a key outside its prefixes', () => {
    const [r] = uiCoverage({ en, pt: { 'markets.search': 'Buscar' } }, 'en', { pt: ['markets.col.'] });
    expect(r.violations).toEqual(['nav.home']);
    expect(r.pending).toEqual(['markets.col.price']);
  });

  it('reports a pending locale with nothing left under its prefixes as incomplete with no pending keys', () => {
    const [r] = uiCoverage({ en, pt: { ...en } }, 'en', { pt: ['markets.'] });
    expect(r).toMatchObject({ complete: false, pending: [], violations: [] });
  });

  it('treats an empty string as missing and reports keys the base does not have', () => {
    const [r] = uiCoverage({ en, ja: { ...en, 'nav.home': '', 'nav.hmoe': 'typo' } }, 'en', {});
    expect(r.violations).toEqual(['nav.home']);
    expect(r.extra).toEqual(['nav.hmoe']);
  });
});
