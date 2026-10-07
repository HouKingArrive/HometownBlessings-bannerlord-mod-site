import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const makeSchema = ({ image }: { image: () => any }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    cover: image().optional(),
    draft: z.boolean().default(false),
  });

export const collections = {
  features: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/features' }),
    schema: makeSchema,
  }),
  guides: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/guides' }),
    schema: makeSchema,
  }),
};
