import type { CreateTest } from "./create-test.types";

export function transformCreateTestToFormData(
  createTest: CreateTest,
): FormData {
  const formData = new FormData();

  if (createTest.image instanceof FileList && createTest.image.length > 0) {
    formData.append("image", createTest.image[0]);
  }

  formData.append("title", createTest.title);
  formData.append("description", createTest.description);
  formData.append("category", createTest.category || "");

  return formData;
}
