import { RouteObject } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export const testPageRoute: RouteObject = {
  path: pathKeys.test.root,
  lazy: async () => {
    const [loader, Component] = await Promise.all([
      import("./test-page.loader").then((modul) => modul.default),
      import("./test-page.ui").then((modul) => modul.default),
    ]);

    return { loader, Component };
  },
};
