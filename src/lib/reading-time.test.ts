import { describe, expect, it } from 'vitest';
import { readingTime } from './reading-time';

describe('readingTime', () => {
  it('rounds to the nearest minute at 225 wpm', () => {
    // 450 words => exactly 2 minutes
    expect(readingTime('word '.repeat(450))).toBe(2);
  });

  it('rounds up past the half-minute boundary', () => {
    // 338 words => 1.502 minutes, should round to 2
    expect(readingTime('word '.repeat(338))).toBe(2);
  });

  it('rounds down below the half-minute boundary', () => {
    // 300 words => 1.333 minutes, should round to 1
    expect(readingTime('word '.repeat(300))).toBe(1);
  });

  it('returns at least 1 minute for very short content', () => {
    expect(readingTime('three little words')).toBe(1);
  });

  it('returns 1 minute for empty content rather than 0', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('   \n  ')).toBe(1);
  });

  it('does not count repeated whitespace as words', () => {
    // 450 words separated by multi-character whitespace => 2 minutes
    const body = Array(450).fill('word').join('  \n\n ');
    expect(readingTime(body)).toBe(2);
  });

  it('scales to longer articles', () => {
    // 1800 words => 8 minutes
    expect(readingTime('word '.repeat(1800))).toBe(8);
  });
});
