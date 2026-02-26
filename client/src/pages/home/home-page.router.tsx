import { RouteObject } from "react-router-dom";

import { homePageLoader } from "./home-page.loader";
import { HomePage } from "./home-page.ui";

export const homePageRoute: RouteObject = {
  path: "/",
  element: <HomePage />,
  loader: homePageLoader,
};
