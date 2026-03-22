import { z } from "zod";

import { CreateQuestionSchema } from "./add-question.contracts";

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;
