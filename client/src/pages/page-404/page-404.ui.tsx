import { Link } from "react-router-dom";

import { pathKeys } from "@/shared/router";

export default function Page404() {
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-8xl">404</h2>
      <h1 className="text-4xl">Page Not Foun</h1>
      <Link className="text-2xl mt-[24px]" to={pathKeys.root}>
        Go back home
      </Link>
    </div>
  );
}
