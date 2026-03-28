import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const AnswerSchema = z.object({
  questionId: objectId,
  selectedOptIds: z.array(objectId),
});

export const SaveResultDtoSchema = z.object({
  answers: z.array(AnswerSchema),
});
