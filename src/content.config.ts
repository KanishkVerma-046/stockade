import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // Kept under 160 chars so search engines show it untruncated.
    // This is a hard build failure on purpose — a silently clipped
    // meta description is invisible until it is already live.
    description: z.string().max(160),
    date: z.coerce.date(),
    author: z.string().default('Stockade Team'),
    tags: z.array(z.string()).min(1),
    slug: z.string(),
    // Omit the field to publish. Set `draft: true` to keep a post out of
    // the index, the sitemap, related posts, and route generation — the
    // page is not built at all, so there is no unlisted URL to stumble on.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
