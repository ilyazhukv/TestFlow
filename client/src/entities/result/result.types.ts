import { z } from "zod";

import { UserAnswerSchema, FinalResultSchema } from "./result.contracts";

export type Result = z.infer<typeof FinalResultSchema>;
export type UserAnswer = z.infer<typeof UserAnswerSchema>;
