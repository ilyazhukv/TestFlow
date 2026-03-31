import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { SaveResult } from "./passing-test.types";
import { transformResultToDto } from "./passing-test.lib";

import { calcResult, saveResult } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { transformResultDtoToResult } from "@/entities/result/result.lib";
import { Result } from "@/entities/result/result.types";
import { selectSession } from "@/entities/session/session.model";

export function useSaveResultMutation(
  slug: string,
  options: Pick<
    UseMutationOptions<Result, DefaultError, SaveResult, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;
  const isAuth = useSelector(selectSession);

  return useMutation<Result, DefaultError, SaveResult>({
    mutationKey: ["result", "save", slug, ...mutationKey],

    mutationFn: async (answers: SaveResult) => {
      const saveResultDto = transformResultToDto(answers);

      const apiCall = isAuth ? saveResult : calcResult;

      const { data } = await apiCall(slug, saveResultDto);

      return transformResultDtoToResult(data);
    },

    onMutate,

    onSuccess: async (...args) => {
      const promises: Promise<unknown>[] = [];

      if (isAuth) {
        promises.push(queryClient.invalidateQueries({ queryKey: ["results"] }));
      }

      if (onSuccess) {
        promises.push(Promise.resolve(onSuccess(...args)));
      }

      await Promise.all(promises);
    },

    onError,

    onSettled,
  });
}
