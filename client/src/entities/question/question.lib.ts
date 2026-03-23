import { Question } from "./question.types";

import { QuestionDto } from "@/shared/api/api.types";

export function transformQuestionDtoToQuestion(
  questionDto: QuestionDto,
): Question {
  const question = questionDto;

  return {
    ...question,
  };
}
