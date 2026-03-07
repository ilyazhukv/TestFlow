import { Link } from "react-router-dom";

import { pathKeys } from "@/shared/router";
import RegisterForm from "@/features/session/register/register.ui";

export default function RegisterPage() {
  return (
    <div className="flex h-[70%] w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <h1 className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </h1>
        <RegisterForm />
        <p className="text-small text-center">
          <Link to={pathKeys.login}>Already have an account?</Link>
        </p>
      </div>
    </div>
  );
}
