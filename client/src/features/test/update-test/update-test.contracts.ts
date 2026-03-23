import { z } from "zod";

export const UpdateTestSchema = z.object({
  slug: z.string(),
  image: z.any().optional(),
  title: z
    .string()
    .min(1, { message: "Minimum characters 1" })
    .max(128, { message: "Maximum characters 128" }),
  description: z
    .string()
    .min(1, { message: "Minimum characters 1" })
    .max(256, { message: "Maximum characters 256" }),
  category: z.string().optional(),
  questions: z.any().optional(),
  isPublic: z.boolean(),
});