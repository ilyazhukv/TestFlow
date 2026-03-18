import { z } from "zod";

import { FilterQuerySchema } from "@/entities/test/test.contracts";

export const BaseLoaderSchema = z.object({
  request: z.custom<Request>(),
  params: z.object({}),
  context: z.object({ filterQuery: FilterQuerySchema }),
});

export const PrimaryFilterQuerySchema = FilterQuerySchema.omit({}).superRefine(
  (query, ctx) => {
    const { tag } = query;

    if (tag) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tags are not available in personal feed.",
        path: ["tag"],
      });
    }
  },
);

export const PrimaryLoaderArgsSchema = z.object({
  request: z.custom<Request>(),
  params: z.object({}),
  context: z.object({ filterQuery: PrimaryFilterQuerySchema }),
});
