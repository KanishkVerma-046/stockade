/**
 * Structural shape this module needs from a blog entry. Deliberately not
 * `CollectionEntry<'blog'>` — depending on the `astro:content` virtual
 * module would make this logic untestable outside an Astro build.
 */
export interface RelatedCandidate {
  id: string;
  data: {
    tags: string[];
    date: Date;
  };
}

/**
 * Picks up to `limit` posts related to `current`, ranked by number of
 * shared tags and then by recency. When nothing shares a tag every
 * candidate scores 0, so this degrades naturally into "most recent posts"
 * without a separate fallback branch.
 */
export function pickRelated<T extends RelatedCandidate>(
  current: T,
  all: T[],
  limit = 3
): T[] {
  const currentTags = new Set(current.data.tags);

  return all
    .filter(post => post.id !== current.id)
    .map(post => ({
      post,
      shared: post.data.tags.filter(tag => currentTags.has(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        b.post.data.date.getTime() - a.post.data.date.getTime()
    )
    .slice(0, limit)
    .map(scored => scored.post);
}
