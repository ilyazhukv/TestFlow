import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { ErrorBoundary } from "react-error-boundary";
import { useForm, Controller } from "react-hook-form";
import { useSuspenseQuery } from "@tanstack/react-query";

import { DeleteTestButton } from "../delete-test/delete-test.ui";
import { AddQuestionForm } from "../../question/add-question/add-question.ui";

import { UpdateTest } from "./update-test.types";
import { UpdateTestSchema } from "./update-test.contracts";
import { transformTestToUpdateTest } from "./update-test.lib";
import { useUpdateTestMutation } from "./update-test.mutation";

import { categoriesQueryOptions } from "@/entities/category/category.api";
import { testQueryOptions } from "@/entities/test/test.api";
import { QuestionCard } from "@/entities/question/question-card.ui";

interface UpdateTestFormProps {
  slug: string;
}

export function UpdateTestForm(props: UpdateTestFormProps) {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseUpdateTestForm {...props} />
    </ErrorBoundary>
  );
}

function BaseUpdateTestForm({ slug }: UpdateTestFormProps) {
  const { data: categories } = useSuspenseQuery(categoriesQueryOptions());
  const { data: test } = useSuspenseQuery(testQueryOptions(slug));

  const { mutate, isPending, isError, error } = useUpdateTestMutation({
    mutationKey: [slug],
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<UpdateTest>({
    mode: "onTouched",
    resolver: zodResolver(UpdateTestSchema),
    defaultValues: transformTestToUpdateTest(test),
  });

  const mutationErrors = error?.response?.data || [error?.message];
  const canSubmit = isDirty && isValid && !isPending;

  const onValid = (updateTest: UpdateTest) => {
    mutate(updateTest);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 flex flex-col gap-8">
      <Card className="shadow-sm">
        <CardHeader className="flex justify-between items-center px-6 pt-6">
          <div>
            <h1 className="text-2xl font-bold">Test settings</h1>
            <p className="text-default-500 text-small text-gray-400">
              Editing basic information
            </p>
          </div>
          <DeleteTestButton slug={slug} />
        </CardHeader>

        <CardBody className="px-6 pb-6">
          <form
            className="flex flex-col gap-6 mt-4"
            onSubmit={handleSubmit(onValid)}
          >
            {isError && (
              <div className="p-3 rounded-medium bg-danger-50 text-danger text-tiny">
                {mutationErrors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Title"
                labelPlacement="outside"
                placeholder="Title..."
                {...register("title")}
                errorMessage={errors.title?.message}
                isDisabled={isPending}
                isInvalid={!!errors.title}
              />

              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    {...field}
                    errorMessage={errors.category?.message}
                    isDisabled={isPending}
                    isInvalid={!!errors.category}
                    label="Category"
                    labelPlacement="outside"
                    placeholder="Category..."
                    selectedKeys={field.value ? [field.value] : []}
                  >
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} textValue={cat.title}>
                        {cat.title}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Description..."
              {...register("description")}
              errorMessage={errors.description?.message}
              isDisabled={isPending}
              isInvalid={!!errors.description}
            />

            <div className="flex flex-col gap-4">
              <Input
                accept="image/*"
                label="Image"
                labelPlacement="outside"
                type="file"
                {...register("image")}
                isDisabled={isPending}
              />

              <Controller
                control={control}
                name="isPublic"
                render={({ field: { value, onChange, ...rest } }) => (
                  <Checkbox
                    {...rest}
                    isDisabled={isPending}
                    isSelected={value}
                    onValueChange={onChange}
                  >
                    Public test
                  </Checkbox>
                )}
              />

              <Input
                label="Time Limit"
                labelPlacement="outside"
                placeholder="0"
                type="number"
                {...register("timeLimit", { valueAsNumber: true })}
                errorMessage={errors.timeLimit?.message}
                isDisabled={isPending}
                isInvalid={!!errors.timeLimit}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">min</span>
                  </div>
                }
              />
            </div>

            <Button
              className="font-semibold"
              color="primary"
              disabled={!canSubmit}
              isLoading={isPending}
              size="lg"
              type="submit"
            >
              Save changes
            </Button>
          </form>
        </CardBody>
      </Card>

      <Divider />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-400">Test questions</h2>
          <p className="text-default-500 text-small">
            Managing your list of questions and answers
          </p>
        </div>

        <Card className="border-2 border-dashed border-default-200 bg-transparent shadow-none">
          <CardHeader className="px-6 pt-6">
            <h3 className="text-lg font-semibold">Add Question</h3>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <AddQuestionForm testSlug={slug} />
          </CardBody>
        </Card>

        {test.questions.length > 0 ? (
          <div className="flex flex-col gap-4 text-gray-400">
            {test.questions.map((question, index) => (
              <QuestionCard
                key={question._id}
                index={index}
                question={question}
                slug={slug}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-default-50 border-none">
            <CardBody className="py-10 text-center text-default-500">
              There are no questions in this test yet.
            </CardBody>
          </Card>
        )}
      </section>
    </div>
  );
}
