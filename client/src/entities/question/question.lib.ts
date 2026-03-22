import { QuestionDto, OptionDto } from "@/shared/api/api.types";
import { Question, Option } from "./question.types";

export function transformQuestionDtoToQuestion(questionDto: QuestionDto): Question {
  const question = questionDto;

  return {
    ...question,
  };
}

