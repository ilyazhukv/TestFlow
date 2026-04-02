import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

import { useRegisterMutation } from "./register.mutation";

import { pathKeys } from "@/shared/router";

export default function RegisterForm() {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseRegisterForm />
    </ErrorBoundary>
  );
}

function BaseRegisterForm() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  const registerMutation = useRegisterMutation({
    onSuccess: () => navigate(pathKeys.root),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as any;

    registerMutation.mutate(data);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Userame"
        labelPlacement="outside"
        name="name"
        placeholder="Enter your username"
        type="text"
        variant="bordered"
      />
      <Input
        isRequired
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
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

      {registerMutation.isError && (
        <p className="text-danger text-small">
          {registerMutation.error.response?.data.map((msg) => (
            <p key={msg} className="text-danger text-tiny">
              {msg}
            </p>
          )) || "Register failed"}
        </p>
      )}

      <Button
        className="w-full"
        color="primary"
        isLoading={registerMutation.isPending}
        type="submit"
      >
        Sign Up
      </Button>
    </Form>
  );
}
