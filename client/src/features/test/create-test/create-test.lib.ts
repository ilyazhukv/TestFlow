import type { CreateTestDto } from "@/shared/api/api.types";
import type { CreateTest } from "./create-test.types";

export function transformCreateTestToCreateTestDto(createTest: CreateTest): CreateTestDto {
  return {
    test: {
      image: createTest.image || null,
      title: createTest.title,
      description: createTest.description,
      category: createTest.category,
      isPublic: createTest.isPublic,
    },
  };
}
