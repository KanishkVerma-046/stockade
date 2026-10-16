// Detects markdown bold that failed to render and shows up as literal `**` in
// a built page. CommonMark only opens/closes emphasis at "flanking" positions,
// so `も**$25,000**を` (CJK letter, then punctuation) prints the asterisks
// instead of bolding — invisible in source, obvious on the page. 30 such spans
// shipped across ja/ko posts before this check existed.
//
// Only visible text counts: <script>, <style>, comments, and <code>/<pre>
// content (where `**` can be legitimate, e.g. an exponent) are ignored.

export interface LiteralBold {
  page: string;
  count: number;
  samples: string[];
}

export function visibleText(html: string): string {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(pre|code)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
}

export function findLiteralBold(pages: { path: string; html: string }[]): LiteralBold[] {
  const out: LiteralBold[] = [];
  for (const { path, html } of pages) {
    const text = visibleText(html);
    const hits = [...text.matchAll(/\*\*/g)];
    if (hits.length === 0) continue;
    out.push({
      page: path,
      count: hits.length,
      samples: hits.slice(0, 3).map(m => text.slice(Math.max(0, m.index! - 20), m.index! + 22).replace(/\s+/g, ' ').trim()),
    });
  }
  return out;
}
