import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    track: z.enum(['guide', 'bots', 'client']),
    order: z.number().int(),
    badge: z.string().optional(),
  }),
});

export const collections = { docs };
