import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { transformCreateTestToCreateTestDto } from "./create-test.lib";
import { CreateTest } from "./create-test.types";

import { createTest } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { TESTS_ROOT_QUERY_KEY } from "@/entities/test/test.api";
import { transformTestDtoToTest } from "@/entities/test/test.lib";
import { Test } from "@/entities/test/test.types";

export function useCreateTestMutation(
  options: Pick<
    UseMutationOptions<Test, DefaultError, CreateTest, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["test", "create", ...mutationKey],

    mutationFn: async (createTestData: CreateTest) => {
      const createTestDto = transformCreateTestToCreateTestDto(createTestData);
      const { data } = await createTest(createTestDto);
      const test = transformTestDtoToTest(data);

      return test;
    },

    onMutate,

    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: TESTS_ROOT_QUERY_KEY }),
        onSuccess?.(...args),
      ]);
    },

    onError,

    onSettled,
  });
}
