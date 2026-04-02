import type { User } from "@/entities/session/session.types";
import type { RegisterUser } from "./register.types";

import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { transformRegisterUserToRegisterUserDto } from "./register.lib";

import { registerUser } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { store } from "@/shared/store";
import { sessionQueryOptions } from "@/entities/session/session.api";
import { transformUserDtoToUser } from "@/entities/session/session.lib";
import { setSession } from "@/entities/session/session.model";

export function useRegisterMutation(
  options: Pick<
    UseMutationOptions<User, DefaultError, RegisterUser, unknown>,
    "mutationKey" | "onMutate" | "onSuccess" | "onError" | "onSettled"
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options;

  return useMutation({
    mutationKey: ["session", "register-user", ...mutationKey],

    mutationFn: async (registerUserData: RegisterUser) => {
      const registerUserDto =
        transformRegisterUserToRegisterUserDto(registerUserData);
      const { data } = await registerUser(registerUserDto);
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
