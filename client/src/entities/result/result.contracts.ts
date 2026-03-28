import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const UserAnswerSchema = z.object({
  questionId: objectId,
  selectedOptIds: z.array(objectId),
});

export const FinalResultSchema = z.object({
  id: objectId,
  testId: objectId,
  score: z.number(),
  maxScore: z.number(),
  percent: z.number(),
  completedAt: z.string(),
});
