import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const homeSchema = z.object({
  modelNumber: z.string(),
  type: z.string(),
  sqft: z.number(),
  series: z.string(),
  beds: z.number(),
  baths: z.number()
});

export type Home = z.infer<typeof homeSchema>;

const homes = defineCollection({
  // loader: file('/homes.json'),
  // loader: homesLoader(),
  loader: async () => {
    const response = await fetch('https://d1-http.mceryak.workers.dev/homes');
    const data = await response.json();
    return data.map(home => ({
      id: home.modelNumber,
      ...home
    }));
  },
  schema: homeSchema
})

const metadata = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/metadata'}),
  schema: z.object({
    id: z.string(),
    value: z.string()
  })
});



export const collections = { homes, metadata };