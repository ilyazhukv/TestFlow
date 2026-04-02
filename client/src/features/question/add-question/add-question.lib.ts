import type { CreateQuestion } from "./add-question.types";

export function transformCreateQuestionToFormData(
  createQuestion: CreateQuestion,
): FormData {
  const formData = new FormData();

  if (
    createQuestion.image instanceof FileList &&
    createQuestion.image.length > 0
  ) {
    formData.append("image", createQuestion.image[0]);
  }

  formData.append("text", createQuestion.text);
  formData.append("options", JSON.stringify(createQuestion.options));
  formData.append("type", createQuestion.type);
  formData.append("score", String(createQuestion.score));

  return formData;
}
