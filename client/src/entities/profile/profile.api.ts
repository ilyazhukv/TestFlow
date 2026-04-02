import { queryOptions } from "@tanstack/react-query";

import { Profile } from "./profile.types";
import { transformProfileDtoToProfile } from "./profile.lib";

import { getProfileByName } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";

export const profileQueryOptions = (name: string) =>
  queryOptions({
    queryKey: ["profile", name],

    queryFn: async ({ signal }) => {
      const { data } = await getProfileByName(name, { signal });
      const profile = transformProfileDtoToProfile(data);

      return profile;
    },

    initialData: () => queryClient.getQueryData<Profile>(["profile", name]),

    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["profile", name])?.dataUpdatedAt,
  });
