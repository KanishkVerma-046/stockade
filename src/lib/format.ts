// Templates for island UI strings that carry numbers. Each locale writes the
// whole sentence with named placeholders ("{n} trades · {wr}% win"), so word
// order is the translation's choice, not the code's — string concatenation
// can't express ja/ko/de word order.

export type FormatVars = Record<string, string | number>;

/** One template per CLDR plural category; `other` is required as the fallback. */
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** Replaces each `{name}` with `vars.name`. Unknown names are left as written. */
export function format(template: string, vars: FormatVars): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  );
}

/**
 * Picks the template for `n` under `locale`'s plural rules (Intl.PluralRules),
 * falling back to `other`, and formats it with `{n}` plus any extra vars.
 *
 * `zero` is an explicit form for exactly 0, used whenever it is given: none of
 * our locales has a CLDR zero category, so a locale opts in where its CLDR
 * form reads oddly at 0 (pt puts 0 in "one": "0 operação fechada").
 */
export function plural(locale: string, n: number, forms: PluralForms, vars: FormatVars = {}): string {
  return format(pluralTemplate(locale, n, forms), { ...vars, n });
}

/**
 * The unformatted template `plural()` would pick, for callers that style the
 * number apart from the words around it (split on `{n}`).
 */
export function pluralTemplate(locale: string, n: number, forms: PluralForms): string {
  if (n === 0 && forms.zero) return forms.zero;
  return forms[new Intl.PluralRules(locale).select(n)] ?? forms.other;
}

// Money stays en-US ($1,234.56) in every locale (Phase A decision b).
const usd = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** A balance: no sign when positive, a leading minus when negative. */
export function formatMoney(n: number): string {
  return (n < 0 ? '-' : '') + usd(n);
}

/** A P&L: always signed, so a loss reads as one without its colour. */
export function formatSignedMoney(n: number): string {
  return (n >= 0 ? '+' : '-') + usd(n);
}
