import { z } from "zod";

import { CategorySchema, CategoriesSchema } from "./category.contracts";

export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;
