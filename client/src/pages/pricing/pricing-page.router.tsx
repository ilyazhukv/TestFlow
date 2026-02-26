import { RouteObject } from "react-router-dom";

import { pricingPageLoader } from "./pricing-page.loader";
import { PricingPage } from "./pricing-page.ui";

export const pricingPageRoute: RouteObject = {
  path: "/pricing",
  element: <PricingPage />,
  loader: pricingPageLoader,
};
