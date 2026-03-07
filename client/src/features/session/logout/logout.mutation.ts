import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query";

import { logoutUser } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { store } from "@/shared/store";
import { resetSession } from "@/entities/session/session.model";
import { sessionQueryOptions } from "@/entities/session/session.api";

export function useLogoutMutation(
  options: Pick<
    UseMutationOptions<void, DefaultError, void, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["session", "logout-user", ...mutationKey],

    mutationFn: () => logoutUser().then(() => {}),

    onMutate,

    onSuccess: async (...args) => {
      store.dispatch(resetSession());
      queryClient.removeQueries({ queryKey: sessionQueryOptions.queryKey });
      await onSuccess?.(...args);
    },

    onError,

    onSettled,
  });
}
