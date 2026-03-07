import { Link } from "react-router-dom";

import { pathKeys } from "@/shared/router";
import LoginForm from "@/features/session/login/login.ui";

export default function LoginPage() {
  return (
    <div className="flex h-[70%] w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <h1 className="pb-4 text-left text-3xl font-semibold">
          Sign In
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </h1>
        <LoginForm />
        <p className="text-small text-center">
          <Link to={pathKeys.register}>Need an account?</Link>
        </p>
      </div>
    </div>
  );
}
