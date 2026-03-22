import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { deleteTest } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { TESTS_ROOT_QUERY_KEY } from "@/entities/test/test.api";

export function useDeleteTestMutation(
  options: Pick<
    UseMutationOptions<unknown, DefaultError, string, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["article", "delete", ...mutationKey],

    mutationFn: (slug: string) => deleteTest(slug),

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
