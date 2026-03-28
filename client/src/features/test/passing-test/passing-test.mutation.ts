import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { SaveResult } from "./passing-test.types";
import { transformResultToDto } from "./passing-test.lib";

import { saveResult } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { transformResultDtoToResult } from "@/entities/result/result.lib";
import { Result } from "@/entities/result/result.types";

export function useSaveResultMutation(
  slug: string,
  options: Pick<
    UseMutationOptions<Result, DefaultError, SaveResult, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation<Result, DefaultError, SaveResult>({
    mutationKey: ["result", "save", slug, ...mutationKey],

    mutationFn: async (answers: SaveResult) => {
      const saveResultDto = transformResultToDto(answers);

      const { data } = await saveResult(slug, saveResultDto);

      return transformResultDtoToResult(data);
    },

    onMutate,

    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["results"] }),
        onSuccess?.(...args),
      ]);
    },

    onError,

    onSettled,
  });
}
