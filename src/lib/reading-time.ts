const WORDS_PER_MINUTE = 225;

/**
 * Estimated read time in whole minutes for a block of Markdown source.
 * Always returns at least 1 so the UI never renders "0 min read".
 */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
