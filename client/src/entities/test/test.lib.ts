import type { TestDto, TestsDto, FilterQueryDto } from "@/shared/api/api.types";
import type { Test, Tests, FilterQuery } from "./test.types";

export function transformTestDtoToTest(testDto: TestDto): Test {
  const test = testDto;

  return {
    id: test._id,
    slug: test.slug || test._id,
    image: test.image || null,
    title: test.title,
    description: test.description,
    timeLimit: test.timeLimit,
    isPublic: test.isPublic,
    createdAt: test.createdAt,
    author: {
      id: test.author._id,
      name: test.author.name,
      avatar: test.author.avatar || null,
    },
    category: test.category
      ? {
          id: test.category._id,
          title: test.category.title,
        }
      : null,
    questions: Array.isArray(test.questions)
      ? test.questions.filter(
          (q): q is Exclude<typeof q, string> => typeof q !== "string",
        )
      : [],
  };
}

export function transformTestsDtoToTests(testsDto: TestsDto): Tests {
  const { tests, testsCount } = testsDto;

  return {
    tests: tests.map((test) => transformTestDtoToTest(test)),
    testsCount,
  };
}

export function transformFilterQueryToFilterQueryDto(
  filterQuery: FilterQuery,
): FilterQueryDto {
  const { page, ...otherParams } = filterQuery;
  const limit = 9;
  const offset = (Number(page) - 1) * limit;

  return {
    ...otherParams,
    offset,
    limit,
  };
}
