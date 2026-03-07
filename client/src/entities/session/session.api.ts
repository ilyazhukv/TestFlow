import { queryOptions } from "@tanstack/react-query";

import { transformUserDtoToUser } from "./session.lib";
import { User } from "./session.types";
import { resetSession, setSession } from "./session.model";

import { getUser, refreshToken } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { store } from "@/shared/store";

export const sessionQueryOptions = queryOptions({
  queryKey: ["session", "current-user"],

  queryFn: async ({ signal }) => {
    const { data } = await getUser({ signal });
    const user = transformUserDtoToUser(data);

    store.dispatch(setSession(user));

    return user;
  },

  initialData: () =>
    queryClient.getQueryData<User>(["session", "current-user"]),
  initialDataUpdatedAt: () =>
    queryClient.getQueryState(["session", "current-user"])?.dataUpdatedAt,
});

export async function refreshSession() {
  try {
    const { data } = await refreshToken();
    const user = transformUserDtoToUser(data);

    store.dispatch(setSession(user));
  } catch (error) {
    store.dispatch(resetSession());
    throw error;
  }
}
