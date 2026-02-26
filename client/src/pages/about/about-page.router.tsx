import { RouteObject } from "react-router-dom";

import { aboutPageLoader } from "./about-page.loader";
import { AboutPage } from "./about-page.ui";

export const aboutPageRoute: RouteObject = {
  path: "/about",
  element: <AboutPage />,
  loader: aboutPageLoader,
};
