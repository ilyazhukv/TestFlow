import { RouteObject } from "react-router-dom";

import { docsPageLoader } from "./docs-page.loader";
import { DocsPage } from "./docs-page.ui";

export const docsPageRoute: RouteObject = {
  path: "/docs",
  element: <DocsPage />,
  loader: docsPageLoader,
};
