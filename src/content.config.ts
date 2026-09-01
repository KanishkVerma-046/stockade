import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = z.object({
  title: z.string(),
  // Kept under 160 chars so search engines show it untruncated.
  // This is a hard build failure on purpose — a silently clipped
  // meta description is invisible until it is already live.
  description: z.string().max(160),
  date: z.coerce.date(),
  // Names the site as publisher rather than an individual. Drives the
  // visible byline and the article:author meta tag.
  author: z.string().default('Stockade Team'),
  tags: z.array(z.string()).min(1),
  slug: z.string(),
  // Omit the field to publish. Set `draft: true` to keep a post out of
  // the index, the sitemap, related posts, and route generation — the
  // page is not built at all, so there is no unlisted URL to stumble on.
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: blogSchema,
});

// Spanish translations live in a mirrored collection rather than a `locale`
// field on `blog` — matches how every other translated page in this project
// is a separate file per locale, and keeps the English collection's schema
// untouched for the 18 posts that don't have a Spanish sibling yet.
const blogEs = defineCollection({
  loader: glob({ base: './src/content/blog-es', pattern: '**/*.md' }),
  schema: blogSchema.extend({
    // Localized slugs (e.g. `guia-de-paper-trading`) mean a Spanish post's
    // filename/id no longer matches the English post it translates, so the
    // link between them is explicit: the id (filename) of the English `blog`
    // entry this post translates. The [slug] routes use this to compute
    // hreflang alternates instead of assuming identical ids across locales.
    translationOf: z.string(),
  }),
});

export const collections = { blog, blogEs };
