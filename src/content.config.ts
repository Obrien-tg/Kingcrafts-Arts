import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const bags = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/bags" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      image: image().optional(),
      imageAlt: z.string().min(1).optional(),
      category: z.enum(["side-bag", "satchel", "cooler-bag", "picnic-bag"]),
      availability: z.enum(["unconfirmed", "available", "unavailable"]),
      imageStatus: z.enum(["pending", "confirmed"]),
      publicationStatus: z.enum(["draft", "published"]),
      standardPrice: z.number().int().nonnegative(),
      madeToOrderPrice: z.number().int().nonnegative(),
      materials: z.array(z.string().min(1)).optional(),
      customisationOptions: z.array(z.string().min(1)).optional(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { bags };
