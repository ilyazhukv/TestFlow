import { z } from "zod";

export const CategorySchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const CategoriesSchema = z.array(CategorySchema);