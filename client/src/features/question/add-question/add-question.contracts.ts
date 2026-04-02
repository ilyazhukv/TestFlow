import { z } from "zod";

export const CreateQuestionSchema = z.object({
  image: z.any().optional(),
  text: z.string().min(1, "Enter question text").max(128),
  type: z.enum(["one_answer", "several_answers"]),
  score: z.number().min(1, "Minimum 1 point"),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Answer text is required"),
        isCorrect: z.boolean()
      })
    )
    .min(2, "At least 2 answer options are required."),
});