import { Result } from "./result.types";

import { ResultDto } from "@/shared/api/api.types";

export function transformResultDtoToResult(resultDto: ResultDto): Result {
  return {
    id: resultDto._id,
    testId: resultDto.testId.title,
    score: resultDto.score,
    maxScore: resultDto.maxScore,
    percent: resultDto.percent,
    completedAt: resultDto.completedAt,
  };
}
