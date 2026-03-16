import { RouteObject } from "react-router-dom";

export const testListPageRoute: RouteObject = {
  path: "/test",
  lazy: async () => {
    const [loader, Component] = await Promise.all([
      import("./test-list-page.loader").then((modul) => modul.default),
      import("./test-list-page.ui").then((modul) => modul.default),
    ]);

    return { loader, Component };
  },
};
