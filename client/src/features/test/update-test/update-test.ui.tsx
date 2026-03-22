import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DeleteTestButton } from "../delete-test/delete-test.ui";
import { AddQuestionForm } from "../../question/add-question/add-question.ui";

import { UpdateTest } from "./update-test.types";
import { UpdateTestSchema } from "./update-test.contracts";
import { transformTestToUpdateTest } from "./update-test.lib";
import { useUpdateTestMutation } from "./update-test.mutation";

import { categoriesQueryOptions } from "@/entities/category/category.api";
import { pathKeys } from "@/shared/router";
import { testQueryOptions } from "@/entities/test/test.api";
import { QuestionCard } from "@/entities/question/question-card.ui";

type UpdateTestFormProps = {
  slug: string;
};

export function UpdateTestForm(props: UpdateTestFormProps) {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseUpdateTestForm {...props} />
    </ErrorBoundary>
  );
}

function BaseUpdateTestForm(props: UpdateTestFormProps) {
  const { slug } = props;

  const navigate = useNavigate();

  const { data: categories, isLoading: isCatsLoading } = useSuspenseQuery(
    categoriesQueryOptions(),
  );
  const { data: test } = useSuspenseQuery(testQueryOptions(slug));

  const { mutate, isPending, isError, error } = useUpdateTestMutation({
    mutationKey: [slug],
    onSuccess: (updatedTest) => {
      navigate(pathKeys.test.bySlug(updatedTest.slug), { replace: true });
    },
  });

  const mutationErrors = error?.response?.data || [error?.message];

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateTest>({
    mode: "onTouched",
    resolver: zodResolver(UpdateTestSchema),
    defaultValues: transformTestToUpdateTest(test),
  });

  const canSubmit = [isDirty, isValid, !isPending].every(Boolean);

  const onValid = (updateTest: UpdateTest) => {
    mutate(updateTest);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <h1>Editer Test Page</h1>

        {isError && (
          <ul>
            {mutationErrors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <fieldset className="form-group">
          <input
            accept="image/*"
            disabled={isPending}
            placeholder="Test Image"
            type="file"
            {...register("image")}
          />
          <ErrorMessage as="div" errors={errors} name="image" role="alert" />
        </fieldset>

        <fieldset className="form-group">
          <input
            disabled={isPending}
            placeholder="Test Title"
            type="text"
            {...register("title")}
          />
          <ErrorMessage as="div" errors={errors} name="title" role="alert" />
        </fieldset>

        <fieldset className="form-group">
          <input
            disabled={isPending}
            placeholder="Test Description"
            type="text"
            {...register("description")}
          />
          <ErrorMessage
            as="div"
            errors={errors}
            name="description"
            role="alert"
          />
        </fieldset>

        <fieldset className="form-group">
          <select
            disabled={isPending || isCatsLoading}
            {...register("category")}
          >
            <option value="">Select Category</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <ErrorMessage as="div" errors={errors} name="category" role="alert" />
        </fieldset>

        <fieldset className="form-group">
          <input
            disabled={isPending}
            placeholder="Test Public"
            type="checkbox"
            {...register("isPublic")}
          />
          <ErrorMessage as="div" errors={errors} name="isPublic" role="alert" />
        </fieldset>

        <Button
          className="btn btn-lg pull-xs-right btn-primary"
          data-test="Test-submit"
          disabled={!canSubmit}
          type="submit"
        >
          Update Test
        </Button>

        <DeleteTestButton slug={slug} />
      </form>

      <div className="questions-section mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Test questions</h2>
        </div>

        {test.questions.length > 0 ? (
          <div className="questions-list">
            {test.questions.map((question, index) => (
              <QuestionCard
                key={question._id}
                index={index}
                question={question}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">
            There are no questions in this test.
          </p>
        )}

        <div className="mt-8 p-6 border-2 border-dashed border-gray-200 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Add a new question</h3>
          <AddQuestionForm testSlug={slug} />
        </div>
      </div>
    </>
  );
}
