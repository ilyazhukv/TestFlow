import { createBrowserRouter } from "react-router-dom";

import { DefaultLayout } from "./layouts/default";

import { routes } from "@/shared/router";

export const browserRouter = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: routes,
  },
]);
