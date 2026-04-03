import { RouteObject } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export const profilePageRoute: RouteObject = {
  path: pathKeys.profile.root,
  children: [
    {
      path: ":name",
      lazy: async () => {
        const [loader, Component] = await Promise.all([
          import("./profile-page.loader").then((module) => module.default),
          import("./profile-page.ui").then((module) => module.default),
        ]);

        return { loader, Component };
      },
    },
  ],
};
