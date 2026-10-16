import { describe, it, expect } from 'vitest';
import { findLiteralBold, visibleText } from './literal-markdown';

const page = (html: string, path = '/ja/blog/x/') => ({ path, html });

describe('findLiteralBold', () => {
  it('flags bold that rendered as literal asterisks', () => {
    const [hit] = findLiteralBold([page('<p>日には少なくとも**$25,000の資産**を維持</p>')]);
    expect(hit.page).toBe('/ja/blog/x/');
    expect(hit.count).toBe(2);
    expect(hit.samples[0]).toContain('**$25,000');
  });

  it('passes bold that rendered as <strong>', () => {
    expect(findLiteralBold([page('<p>日には<strong>少なくとも$25,000の資産</strong>を維持</p>')])).toEqual([]);
  });

  it('ignores ** inside scripts, styles, comments, code and pre', () => {
    const html =
      '<script>const x = 2 ** 3;</script><style>/* ** */</style><!-- ** -->' +
      '<p>Use <code>2**3</code> for powers.</p><pre>a ** b</pre>';
    expect(findLiteralBold([page(html)])).toEqual([]);
  });

  it('does not treat attribute values as visible text', () => {
    expect(visibleText('<a title="**x**" href="/">ok</a>')).not.toContain('**');
  });
});
