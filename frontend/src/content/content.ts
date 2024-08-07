import { z, defineCollection } from 'astro:content';

const bulletinCollection = defineCollection({
  type: 'content',
  schema: {
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.date(),
    image: z.string(),
  },
});

export const collections = {
  bulletin: bulletinCollection,
};
