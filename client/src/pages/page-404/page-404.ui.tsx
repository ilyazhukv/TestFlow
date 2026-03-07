import { Link } from 'react-router-dom';
import { pathKeys } from "@/shared/router";

export default function Page404() {
  return (
    <div className="container">
      <h1 className="logo-font" data-test="not-found-title">
        Page not found
      </h1>
      <p>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link
        className="btn btn-sm btn-outline-primary"
        data-test="go-home-link"
        to={pathKeys.root}
      >
        Go back home
      </Link>
    </div>
  );
}
