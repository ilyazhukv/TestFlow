import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { useLoginMutation } from "./login.mutation";

import { pathKeys } from "@/shared/router";

export default function LoginForm() {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseLoginForm />
    </ErrorBoundary>
  );
}

function BaseLoginForm() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  const loginMutation = useLoginMutation({
    onSuccess: () => navigate(pathKeys.root),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as any;

    loginMutation.mutate(data);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Login"
        labelPlacement="outside"
        name="login"
        placeholder="Enter your username or email"
        type="login"
        variant="bordered"
      />
      <Input
        isRequired
        endContent={
          <button type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <Icon
                className="text-default-400 pointer-events-none text-2xl"
                icon="solar:eye-closed-linear"
              />
            ) : (
              <Icon
                className="text-default-400 pointer-events-none text-2xl"
                icon="solar:eye-bold"
              />
            )}
          </button>
        }
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
      />

      {loginMutation.isError && (
        <p className="text-danger text-small">
          {loginMutation.error.response?.data?.[0] || "Login failed"}
        </p>
      )}

      <Button
        className="w-full"
        color="primary"
        isLoading={loginMutation.isPending}
        type="submit"
      >
        Sign In
      </Button>
    </Form>
  );
}
