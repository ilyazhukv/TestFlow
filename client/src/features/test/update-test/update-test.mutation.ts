import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { transformUpdateTestToFormData } from "./update-test.lib";
import { UpdateTest } from "./update-test.types";

import { updateTest } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { TESTS_ROOT_QUERY_KEY } from "@/entities/test/test.api";
import { transformTestDtoToTest } from "@/entities/test/test.lib";
import { Test } from "@/entities/test/test.types";

export function useUpdateTestMutation(
  options: Pick<
    UseMutationOptions<Test, DefaultError, UpdateTest, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["test", "update", ...mutationKey],

    mutationFn: async (updateTestData: UpdateTest) => {
      const { slug } = updateTestData;
      const updateTestDto = transformUpdateTestToFormData(updateTestData);
      const { data } = await updateTest(slug, updateTestDto);
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
