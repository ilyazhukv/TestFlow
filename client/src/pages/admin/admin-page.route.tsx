import { RouteObject } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export const adminRoute: RouteObject = {
  path: pathKeys.admin.root,
  lazy: async () => {
    const Component = (await import("./admin-page.ui")).default;
    return { Component };
  },
};
