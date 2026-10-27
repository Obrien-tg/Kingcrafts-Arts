import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const bags = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/bags" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      image: image().optional(),
      imageAlt: z.string().optional(),
      category: z.enum(["side-bag", "satchel", "cooler-bag", "picnic-bag"]),
      status: z.enum(["image-pending", "ready-for-publication"]),
      standardPrice: z.number().int().nonnegative(),
      madeToOrderPrice: z.number().int().nonnegative(),
      materials: z.array(z.string()).optional(),
      customisationOptions: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { bags };
