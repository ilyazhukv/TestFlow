import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { ErrorBoundary } from "react-error-boundary";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { CreateTest } from "./create-test.types";
import { CreateTestSchema } from "./create-test.contracts";
import { useCreateTestMutation } from "./create-test.mutation";

import { categoriesQueryOptions } from "@/entities/category/category.api";
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

  const { data: categories, isLoading: isCatsLoading } = useQuery(
    categoriesQueryOptions(),
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateTest>({
    mode: "onTouched",
    resolver: zodResolver(CreateTestSchema),
    defaultValues: {
      image: undefined,
      title: "",
      description: "",
      category: "",
      isPublic: false,
    },
  });

  const { mutate, isPending, isError, error } = useCreateTestMutation({
    onSuccess: (editor) => {
      navigate(pathKeys.editor.bySlug(editor.slug), { replace: true });
    },
  });

  const mutationErrors = error?.response?.data || [error?.message];
  const canSubmit = isDirty && isValid && !isPending;

  const onValid = (createTest: CreateTest) => {
    mutate(createTest);
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader className="flex flex-col gap-1 items-start px-6 pt-6">
        <h1 className="text-2xl font-bold">Creating a new test</h1>
        <p className="text-default-500">Fill in the details to create</p>
      </CardHeader>

      <CardBody>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onValid)}>
          {isError && (
            <div className="p-3 rounded-medium bg-danger-50 text-danger text-small">
              <ul className="list-disc list-inside">
                {mutationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <Input
              accept="image/*"
              label="Image..."
              labelPlacement="outside"
              type="file"
              {...register("image")}
              isDisabled={isPending}
            />

            <Input
              label="Title"
              labelPlacement="outside"
              placeholder="Title..."
              {...register("title")}
              errorMessage={errors.title?.message}
              isDisabled={isPending}
              isInvalid={!!errors.title}
            />

            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Description..."
              {...register("description")}
              errorMessage={errors.description?.message}
              isDisabled={isPending}
              isInvalid={!!errors.description}
            />

            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  {...field}
                  errorMessage={errors.category?.message}
                  isDisabled={isPending || isCatsLoading}
                  isInvalid={!!errors.category}
                  isLoading={isCatsLoading}
                  label="Category"
                  labelPlacement="outside"
                  placeholder="Category..."
                  selectedKeys={field.value ? [field.value] : []}
                >
                  {(categories ?? []).map((category) => (
                    <SelectItem key={category.id} textValue={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <Button
            fullWidth
            className="mt-2"
            color="primary"
            disabled={!canSubmit}
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            Create Test
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
