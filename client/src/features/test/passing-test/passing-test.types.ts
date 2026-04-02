import { z } from "zod";

import { AnswerSchema, SaveResultDtoSchema } from "./passing-test.contracts";

export type SaveResultDto = z.infer<typeof SaveResultDtoSchema>;
export type SaveResult = z.infer<typeof AnswerSchema>[];
