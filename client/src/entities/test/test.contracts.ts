import { z } from "zod";

import { QuestionSchema } from "../question/question.contracts";

export const TestSchema = z.object({
  id: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  timeLimit: z.number().optional(),
  category: z
    .object({ id: z.string(), title: z.string() })
    .optional()
    .nullable(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().nullable(),
  }),
  questions: z.array(QuestionSchema).optional().default([]),
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
