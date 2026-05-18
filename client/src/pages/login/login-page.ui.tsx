import { Link } from "react-router-dom";
import { Logo } from "@/shared/ui/icons/icons";
import { pathKeys } from "@/shared/router";
import LoginForm from "@/features/session/login/login.ui";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-slide-up">
      <div className="w-full max-w-md">
        <div className="bg-background/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-default-200/50 p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <Logo className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-black text-foreground">
              Welcome Back
            </h1>
            <p className="text-default-500 mt-1 text-sm">
              Sign in to continue your learning journey
            </p>
          </div>

          <LoginForm />

          <p className="text-small text-center mt-6 text-default-500">
            Don't have an account?{" "}
            <Link
              to={pathKeys.register}
              className="text-primary font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}