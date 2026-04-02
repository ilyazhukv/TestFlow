import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Checkbox } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";
import { TrashBin } from "@gravity-ui/icons";

import { CreateQuestionSchema } from "./add-question.contracts";
import { CreateQuestion } from "./add-question.types";
import { useAddQuestionMutation } from "./add-question.mutation";

interface Props {
  testSlug: string;
}

export function AddQuestionForm({ testSlug }: Props) {
  const { mutate, isPending } = useAddQuestionMutation(testSlug);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuestion>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      image: undefined,
      text: "",
      type: "one_answer",
      score: 1,
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: CreateQuestion) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="shadow-none border-1 border-default-200">
      <div className="p-4 sm:p-6">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            accept="image/*"
            type="file"
            {...register("image")}
            errorMessage={errors.text?.message}
            isDisabled={isPending}
            isInvalid={!!errors.text}
            label="Question image"
            labelPlacement="outside"
            placeholder="Choose question image"
          />

          <Input
            {...register("text")}
            errorMessage={errors.text?.message}
            isDisabled={isPending}
            isInvalid={!!errors.text}
            label="Question text"
            labelPlacement="outside"
            placeholder="Enter your question"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  {...field}
                  disallowEmptySelection
                  className="flex-1"
                  isDisabled={isPending}
                  label="Question type"
                  labelPlacement="outside"
                  selectedKeys={[field.value]}
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys)[0])
                  }
                >
                  <SelectItem key="one_answer" textValue="One answer">
                    One answer
                  </SelectItem>
                  <SelectItem key="several_answers" textValue="Several answers">
                    Several answers
                  </SelectItem>
                </Select>
              )}
            />
            <Input
              {...register("score", { valueAsNumber: true })}
              className="w-full sm:w-24"
              isDisabled={isPending}
              isInvalid={!!errors.score}
              label="Score"
              labelPlacement="outside"
              placeholder="1"
              type="number"
            />
          </div>

          <Divider />

          <div className="space-y-3">
            <p className="text-sm font-medium text-default-700 px-1">
              Answer options:
            </p>

            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-2 w-full bg-default-50 sm:bg-transparent p-2 sm:p-0 rounded-lg group"
                >
                  <div className="flex-shrink-0">
                    <Controller
                      control={control}
                      name={`options.${index}.isCorrect`}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          color="success"
                          isDisabled={isPending}
                          isSelected={value}
                          size="sm"
                          onValueChange={onChange}
                        />
                      )}
                    />
                  </div>

                  <div className="flex-grow min-w-0">
                    <Input
                      {...register(`options.${index}.text`)}
                      fullWidth
                      className="h-8"
                      isDisabled={isPending}
                      isInvalid={!!errors.options?.[index]?.text}
                      placeholder={`Answer ${index + 1}`}
                      size="sm"
                      variant="underlined"
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <Button
                      isIconOnly
                      className="min-w-8 w-8 h-8 opacity-70 group-hover:opacity-100"
                      color="danger"
                      isDisabled={isPending || fields.length <= 2}
                      radius="full"
                      size="sm"
                      variant="light"
                      onPress={() => remove(index)}
                    >
                      <TrashBin width={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              fullWidth
              className="mt-2"
              isDisabled={isPending}
              size="sm"
              type="button"
              variant="flat"
              onPress={() => append({ text: "", isCorrect: false })}
            >
              Add an option
            </Button>
          </div>

          <Button
            fullWidth
            className="font-bold mt-2 shadow-md"
            color="primary"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            Add a question to the test
          </Button>
        </form>
      </div>
    </div>
  );
}
