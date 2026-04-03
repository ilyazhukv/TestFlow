import type { UpdateTest } from "./update-test.types";

import { Test } from "@/entities/test/test.types";

export function transformUpdateTestToFormData(
  updateTest: UpdateTest,
): FormData {
  const formData = new FormData();

  if (updateTest.image instanceof FileList && updateTest.image.length > 0) {
    formData.append("image", updateTest.image[0]);
  }

  formData.append("title", updateTest.title);
  formData.append("description", updateTest.description);
  formData.append("timeLimit", String(updateTest.timeLimit));
  formData.append("category", updateTest.category || "");
  formData.append("isPublic", String(updateTest.isPublic));

  return formData;
}

export function transformTestToUpdateTest(test: Test): UpdateTest {
  return {
    title: test.title,
    slug: test.slug,
    description: test.description,
    timeLimit: Number(test.timeLimit),
    category: test.category?.id || "",
    isPublic: test.isPublic,
  };
}
