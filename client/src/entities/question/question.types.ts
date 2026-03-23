import { z } from "zod";

import { OptionSchema, QuestionSchema } from "./question.contracts";

export type Option = z.infer<typeof OptionSchema>;
export type Question = z.infer<typeof QuestionSchema>;