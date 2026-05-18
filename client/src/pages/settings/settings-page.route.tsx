import { RouteObject } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export const settingsRoute: RouteObject = {
  path: pathKeys.settings,
  lazy: async () => {
    const Component = (await import("./settings-page.ui")).default;
    return { Component };
  },
};
