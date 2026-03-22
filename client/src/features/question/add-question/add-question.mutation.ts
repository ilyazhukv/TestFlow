import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { transformCreateQuestionToFormData } from "./add-question.lib";
import { CreateQuestion } from "./add-question.types";

import { Question } from "@/entities/question/question.types";
import { queryClient } from "@/shared/queryClient";
import { createQuestion } from "@/shared/api/api.service";

export function useAddQuestionMutation(
  slug: string,
  options: Pick<
    UseMutationOptions<Question, DefaultError, CreateQuestion, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["qusetion", "create", slug, ...mutationKey],

    mutationFn: async (createQuestionData: CreateQuestion) => {
      const formData = transformCreateQuestionToFormData(createQuestionData);
      const { data } = await createQuestion(slug, formData);

      return data;
    },

    onMutate,

    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["test", slug] }),
        onSuccess?.(...args),
      ]);
    },

    onError,

    onSettled,
  });
}
