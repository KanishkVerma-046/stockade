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
 */
export function plural(locale: string, n: number, forms: PluralForms, vars: FormatVars = {}): string {
  const category = new Intl.PluralRules(locale).select(n);
  return format(forms[category] ?? forms.other, { ...vars, n });
}
