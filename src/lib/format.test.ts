import { describe, expect, it } from 'vitest';
import { format, formatMoney, formatSignedMoney, plural, pluralTemplate } from './format';

describe('format', () => {
  it('replaces named placeholders', () => {
    expect(format('{h}h {m}m', { h: 2, m: 5 })).toBe('2h 5m');
  });

  it('replaces a placeholder every time it appears', () => {
    expect(format('{n} of {n}', { n: 3 })).toBe('3 of 3');
  });

  it('leaves unknown placeholders as written, so a missing var is visible', () => {
    expect(format('{n} trades · {wr}% win', { n: 3 })).toBe('3 trades · {wr}% win');
  });

  it('does not depend on placeholder order (ja/ko/de word order)', () => {
    expect(format('{net}・{n}件', { n: 4, net: '+$12.00' })).toBe('+$12.00・4件');
  });

  it('inserts values literally, even ones that look like regex replacement patterns', () => {
    expect(format('net {net}', { net: '$&$1' })).toBe('net $&$1');
  });
});

describe('plural', () => {
  const trades = { one: '{n} closed trade', other: '{n} closed trades' };

  it('picks the English one/other forms', () => {
    expect(plural('en', 1, trades)).toBe('1 closed trade');
    expect(plural('en', 0, trades)).toBe('0 closed trades');
    expect(plural('en', 2, trades)).toBe('2 closed trades');
  });

  it('uses Spanish plural rules (0 is plural)', () => {
    const es = { one: '{n} operación cerrada', other: '{n} operaciones cerradas' };
    expect(plural('es', 0, es)).toBe('0 operaciones cerradas');
    expect(plural('es', 1, es)).toBe('1 operación cerrada');
    expect(plural('es', 5, es)).toBe('5 operaciones cerradas');
  });

  it('uses French plural rules (0 takes the singular)', () => {
    const fr = { one: '{n} trade clôturé', other: '{n} trades clôturés' };
    expect(plural('fr', 0, fr)).toBe('0 trade clôturé');
  });

  it('falls back to "other" when the locale picks a category the forms lack', () => {
    // es selects "many" for 1,000,000 in current CLDR; ja only ever selects "other".
    const es = { one: '{n} operación', other: '{n} operaciones' };
    expect(plural('es', 1_000_000, es)).toBe('1000000 operaciones');
    expect(plural('ja', 1, { other: '{n}件' })).toBe('1件');
  });

  it('uses the zero form for exactly 0 when one is given', () => {
    // pt puts 0 in CLDR "one", which would read "0 operação fechada"
    const pt = { zero: 'Nenhuma operação fechada', one: '{n} operação fechada', other: '{n} operações fechadas' };
    expect(plural('pt', 0, pt)).toBe('Nenhuma operação fechada');
    expect(plural('pt', 1, pt)).toBe('1 operação fechada');
    expect(plural('pt', 2, pt)).toBe('2 operações fechadas');
  });

  it('keeps standard CLDR rules for 0 when there is no zero form', () => {
    expect(plural('pt', 0, { one: '{n} operação fechada', other: '{n} operações fechadas' })).toBe('0 operação fechada');
    expect(plural('en', 0, { one: '{n} closed trade', other: '{n} closed trades' })).toBe('0 closed trades');
  });

  it('does not use the zero form for values that only round to 0', () => {
    expect(plural('en', 0.4, { zero: 'none', one: '{n} trade', other: '{n} trades' })).toBe('0.4 trades');
  });

  it('passes extra vars through alongside {n}', () => {
    const cell = { one: '{n} trade · {wr}% win', other: '{n} trades · {wr}% win' };
    expect(plural('en', 3, cell, { wr: 67 })).toBe('3 trades · 67% win');
  });
});

describe('pluralTemplate', () => {
  it('returns the template plural() would format, unformatted', () => {
    const es = { one: '{n} patrón', other: '{n} patrones' };
    expect(pluralTemplate('es', 1, es)).toBe('{n} patrón');
    expect(pluralTemplate('es', 0, es)).toBe('{n} patrones');
    expect(pluralTemplate('pt', 0, { zero: 'nenhum', one: '{n} padrão', other: '{n} padrões' })).toBe('nenhum');
    expect(pluralTemplate('ja', 1, { other: '{n}件' })).toBe('{n}件');
  });
});

describe('formatSignedMoney', () => {
  it('prefixes a gain with + and a loss with -, as AnalyticsDashboard shows P&L', () => {
    expect(formatSignedMoney(1250)).toBe('+$1,250.00');
    expect(formatSignedMoney(-730.4)).toBe('-$730.40');
  });

  it('treats zero as a gain', () => {
    expect(formatSignedMoney(0)).toBe('+$0.00');
  });

  it('keeps en-US grouping and two decimals in every locale', () => {
    expect(formatSignedMoney(-1234567.891)).toBe('-$1,234,567.89');
  });
});

describe('formatMoney', () => {
  it('has no sign for a positive amount', () => {
    expect(formatMoney(100000)).toBe('$100,000.00');
  });

  it('keeps the minus on a negative amount instead of dropping it', () => {
    expect(formatMoney(-512.5)).toBe('-$512.50');
  });
});
