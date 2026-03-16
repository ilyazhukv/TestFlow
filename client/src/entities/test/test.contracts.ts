import { z } from "zod";

export const TestSchema = z.object({
  id: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  category: z
    .object({ id: z.string(), title: z.string() })
    .optional()
    .nullable(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().nullable(),
  }),
  isPublic: z.boolean(),
  createdAt: z.string(),
});

export const TestsSchema = z.object({
  tests: z.array(TestSchema),
  testsCount: z.number(),
});

export const FilterQuerySchema = z.object({
  page: z.coerce.string().default("1"),
  tag: z.string().optional(),
  search: z.string().optional(),
});
