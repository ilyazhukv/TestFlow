import { RouteObject } from "react-router-dom";

import { homePageRoute } from "@/pages/home";
import { docsPageRoute } from "@/pages/docs";
import { pricingPageRoute } from "@/pages/pricing";
import { blogPageRoute } from "@/pages/blog";
import { aboutPageRoute } from "@/pages/about";

export const routes: RouteObject[] = [
  homePageRoute,
  docsPageRoute,
  pricingPageRoute,
  blogPageRoute,
  aboutPageRoute,
];
