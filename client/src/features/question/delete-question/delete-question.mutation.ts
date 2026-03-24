import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { deleteQuestion } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";

export function useDeleteQuestionMutation(
  options: Pick<
    UseMutationOptions<unknown, DefaultError, {slug: string, questionId: string}, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["question", "delete", ...mutationKey],

    mutationFn: ({ slug, questionId }) => deleteQuestion(slug, questionId),

    onMutate,

    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["test"] }),
        onSuccess?.(...args),
      ]);
    },

    onError,

    onSettled,
  });
}
