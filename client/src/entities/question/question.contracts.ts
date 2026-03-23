import { z } from "zod";

export const OptionSchema = z.object({
  _id: z.string().optional(),
  text: z.string(),
  isCorrect: z.boolean().default(false),
});

export const QuestionSchema = z.object({
  _id: z.string(),
  testId: z.string(),
  text: z.string(),
  image: z.string().optional().nullable(),
  type: z.enum(["one_answer", "several_answers"]),
  options: z.array(OptionSchema).min(2),
  score: z.number().optional(),
});