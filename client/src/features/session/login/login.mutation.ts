import type { User } from "@/entities/session/session.types";
import type { LoginUser } from "./login.types";

import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { transformLoginUserToLoginUserDto } from "./login.lib";

import { loginUser } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { store } from "@/shared/store";
import { sessionQueryOptions } from "@/entities/session/session.api";
import { transformUserDtoToUser } from "@/entities/session/session.lib";
import { setSession } from "@/entities/session/session.model";

export function useLoginMutation(
  options: Pick<
    UseMutationOptions<User, DefaultError, LoginUser, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["session", "login-user", ...mutationKey],

    mutationFn: async (loginUserData: LoginUser) => {
      const loginUserDto = transformLoginUserToLoginUserDto(loginUserData);
      const { data } = await loginUser(loginUserDto);
      const user = transformUserDtoToUser(data);
      return user;
    },

    onMutate,

    onSuccess: async (...args) => {
      store.dispatch(setSession(args[0]));
      queryClient.setQueryData(sessionQueryOptions.queryKey, args[0]);
      await onSuccess?.(...args);
    },

    onError,

    onSettled,
  });
}
