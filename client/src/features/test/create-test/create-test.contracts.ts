import { z } from "zod";

export const CreateTestSchema = z.object({
  image: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "Minimum characters 1" })
    .max(128, { message: "Maximum characters 128" }),
  description: z
    .string()
    .min(1, { message: "Minimum characters 1" })
    .max(256, { message: "Maximum characters 256" }),
  category: z.string().optional(),
  isPublic: z.boolean(),
});
