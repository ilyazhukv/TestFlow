import { RouteObject } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export const testPageRoute: RouteObject = {
  path: pathKeys.test.root,
  children: [
    {
      index: true,
      lazy: async () => {
        const [loader, Component] = await Promise.all([
          import("./test-page.loader").then((modul) => modul.testsPageLoader),
          import("./test-page.ui").then((modul) => modul.ListTestPage),
        ]);

        return { loader, Component };
      },
    },
    {
      path: ":slug",
      lazy: async () => {
        const [loader, Component] = await Promise.all([
          import("./test-page.loader").then((m) => m.testPageLoader),
          import("./test-page.ui").then((m) => m.TestPage),
        ]);

        return { loader, Component };
      },
    },
  ],
};
