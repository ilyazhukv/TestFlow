import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import {
  transformTestDtoToTest,
  transformTestsDtoToTests,
  transformFilterQueryToFilterQueryDto,
} from "./test.lib";
import { Test, Tests, FilterQuery } from "./test.types";

import { getAllTests, getTestBySlug } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";

export const TESTS_ROOT_QUERY_KEY = ["tests"];

export const testQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: [...TESTS_ROOT_QUERY_KEY, slug],

    queryFn: async ({ signal }) => {
      const { data } = await getTestBySlug(slug, { signal });
      const test = transformTestDtoToTest(data);

      return test;
    },

    initialData: () => queryClient.getQueryData<Test>(["test", slug]),

    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["test", slug])?.dataUpdatedAt,
  });

export const testsQueryOptions = (filter: FilterQuery) => {
  const filterDto = transformFilterQueryToFilterQueryDto(filter);

  return queryOptions({
    queryKey: [...TESTS_ROOT_QUERY_KEY, filter],

    queryFn: async ({ signal }) => {
      const config = { signal, params: filterDto };
      const { data } = await getAllTests(config);
      const tests = transformTestsDtoToTests(data);

      return tests;
    },

    placeholderData: keepPreviousData,

    initialData: () =>
      queryClient.getQueryData<Tests>([...TESTS_ROOT_QUERY_KEY, filter]),

    initialDataUpdatedAt: () =>
      queryClient.getQueryState([...TESTS_ROOT_QUERY_KEY, filter])
        ?.dataUpdatedAt,
  });
};
