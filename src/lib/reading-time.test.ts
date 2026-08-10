import { describe, expect, it } from 'vitest';
import { readingTime } from './reading-time';

describe('readingTime', () => {
  it('rounds to the nearest minute at 225 wpm', () => {
    // 450 words => exactly 2 minutes
    expect(readingTime('word '.repeat(450))).toBe(2);
  });

  it('returns at least 1 minute for very short content', () => {
    expect(readingTime('three little words')).toBe(1);
  });

  it('returns 1 minute for empty content rather than 0', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('   \n  ')).toBe(1);
  });

  it('does not count repeated whitespace as words', () => {
    expect(readingTime('one     two\n\n\nthree')).toBe(1);
  });

  it('scales to longer articles', () => {
    // 1800 words => 8 minutes
    expect(readingTime('word '.repeat(1800))).toBe(8);
  });
});
