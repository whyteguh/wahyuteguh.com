import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // "webapp"  -> interactive app that runs in the browser (embedded via iframe)
    // "landing" -> landing page with a download CTA (ebook, template, etc.)
    type: z.enum(['webapp', 'landing']),
    icon: z.string().default('📦'),
    // webapp: path to the app under /public (e.g. /apps/pomodoro/index.html)
    appUrl: z.string().optional(),
    // landing: file the visitor downloads
    downloadUrl: z.string().optional(),
    downloadLabel: z.string().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, resources };
