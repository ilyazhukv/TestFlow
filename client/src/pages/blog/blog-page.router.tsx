import { RouteObject } from "react-router-dom";

import { blogPageLoader } from "./blog-page.loader";
import { BlogPage } from "./blog-page.ui";

export const blogPageRoute: RouteObject = {
  path: "/blog",
  element: <BlogPage />,
  loader: blogPageLoader,
};
