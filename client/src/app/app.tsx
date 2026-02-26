import { RouterProvider } from "react-router-dom";

import { browserRouter } from "./browse-router";

export default function App() {
  return <RouterProvider router={browserRouter} />;
}
