import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';
import dotenv from 'dotenv';

dotenv.config();

const homeSchema = z.object({
  modelNumber: z.string(),
  type: z.string(),
  sqft: z.number(),
  series: z.string(),
  beds: z.number(),
  baths: z.number(),
  floorPlanR2Name: z.string().nullable().optional(),
  walkthroughURL: z.string().nullable().optional(),
  onDisplay: z.number(),
  manufacturer: z.string(),
  createdDate: z.string(),
  isFeatured: z.number(),
  thumbnailR2: z.string().nullable().optional(),
  lastModifiedDate: z.string()
});

const relatedFileSchema = z.object({
  id: z.string(),
  parentKey: z.string(),
  r2Name: z.string(),
  tabName: z.string()
});

export type RelatedFile = z.infer<typeof relatedFileSchema>;
export type Home = z.infer<typeof homeSchema>;

const fetchData = async (path: string) => await fetch('https://d1-http.mceryak.workers.dev/' + path, { headers: { 'Authorization': `Bearer ${process.env.API_TOKEN}`}});

const homes = defineCollection({
  // loader: file('/homes.json'),
  // loader: homesLoader(),
  loader: async () => {
    const response = await fetchData('homes');
    const data = await response.json();
    const mappedData = data.map(home => ({
      ...home,
      id: home.modelNumber,
    }));
    return mappedData;
  },
  schema: homeSchema
})

const company_information = defineCollection({
  loader: async () => {
    const response = await fetchData('company-info');
    const data = await response.json();
    return [{ ...data, id: 'company_info' }];
  },
  schema: z.object({
    phone: z.string(),
    email: z.string()
  })
});

const related_files = defineCollection({
  loader: async () => {
    const response = await fetchData('relatedFiles');
    const data = await response.json();
    return data.map(item => ({
      ...item,
      id: `${item.id}`
    }));
  },
  schema: relatedFileSchema
})


export const collections = { homes, company_information, related_files };