import { SaveResult, SaveResultDto } from "./passing-test.types";

export function transformResultToDto(answers: SaveResult): SaveResultDto {
  return {
    answers: answers.map((answer) => ({
      questionId: answer.questionId,
      selectedOptIds: answer.selectedOptIds,
    })),
  };
}
