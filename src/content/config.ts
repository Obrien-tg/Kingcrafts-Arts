import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const bags = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/bags" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      standardPrice: z.string(),
      madeToOrderPrice: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      materials: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { bags };
