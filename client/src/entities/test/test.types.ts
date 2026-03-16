import { z } from "zod";

import { TestSchema, TestsSchema, FilterQuerySchema } from "./test.contracts";

export type Test = z.infer<typeof TestSchema>;
export type Tests = z.infer<typeof TestsSchema>;
export type FilterQuery = z.infer<typeof FilterQuerySchema>