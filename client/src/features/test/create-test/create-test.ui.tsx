import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { CreateTest } from "./create-test.types";
import { CreateTestSchema } from "./create-test.contracts";
import { useCreateTestMutation } from "./create-test.mutation";

import { pathKeys } from "@/shared/router";

export function CreateTestForm() {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseCreateTestForm />
    </ErrorBoundary>
  );
}

export function BaseCreateTestForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateTest>({
    mode: "onTouched",
    resolver: zodResolver(CreateTestSchema),
    defaultValues: {
      image: "",
      title: "",
      description: "",
      category: "",
      isPublic: false,
    },
  });

  const { mutate, isPending, isError, error } = useCreateTestMutation({
    onSuccess: (test) => {
      navigate(pathKeys.test.bySlug(test.slug), { replace: true });
    },
  });

  const mutationErrors = error?.response?.data || [error?.message];
  const canSubmit = [isDirty, isValid, !isPending].every(Boolean);

  const onValid = (createTest: CreateTest) => {
    mutate(createTest);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {isError && (
        <ul>
          {mutationErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          data-test="article-title-input"
          disabled={isPending}
          placeholder="Test Image Link"
          type="text"
          {...register("image")}
        />
        <ErrorMessage as="div" errors={errors} name="title" role="alert" />
      </fieldset>

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          data-test="article-title-input"
          disabled={isPending}
          placeholder="Test Title"
          type="text"
          {...register("title")}
        />
        <ErrorMessage as="div" errors={errors} name="title" role="alert" />
      </fieldset>

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          data-test="article-title-input"
          disabled={isPending}
          placeholder="Test Description"
          type="text"
          {...register("description")}
        />
        <ErrorMessage as="div" errors={errors} name="title" role="alert" />
      </fieldset>

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          data-test="article-title-input"
          disabled={isPending}
          placeholder="Test Category"
          type="text"
          {...register("category")}
        />
        <ErrorMessage as="div" errors={errors} name="title" role="alert" />
      </fieldset>

      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          data-test="article-title-input"
          disabled={isPending}
          placeholder="Test Public"
          type="checkbox"
          {...register("isPublic")}
        />
        <ErrorMessage as="div" errors={errors} name="title" role="alert" />
      </fieldset>

      <Button
        className="btn btn-lg pull-xs-right btn-primary"
        data-test="article-submit"
        disabled={!canSubmit}
        type="submit"
      >
        Create Test
      </Button>
    </form>
  );
}
