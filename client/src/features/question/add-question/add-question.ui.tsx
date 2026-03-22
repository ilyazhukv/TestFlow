import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 border p-4 rounded">
      <div>
        <input {...register("text")} placeholder="Question text" className="w-full border p-2" />
        {errors.text && <p className="text-red-500">{errors.text.message}</p>}
      </div>

      <div className="flex gap-4">
        <select {...register("type")} className="border p-2">
          <option value="one_answer">One answer</option>
          <option value="several_answers">Several answers</option>
        </select>
        <input type="number" {...register("score", { valueAsNumber: true })} placeholder="score" className="border p-2 w-20" />
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Answer options:</p>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input type="checkbox" {...register(`options.${index}.isCorrect`)} />
            <input 
              {...register(`options.${index}.text`)} 
              placeholder={`Answer ${index + 1}`} 
              className="flex-1 border p-1"
            />
            <Button type="button" onPress={() => remove(index)} size="sm" variant="flat" color="danger">
              Delete
            </Button>
          </div>
        ))}
        <Button type="button" onPress={() => append({ text: "", isCorrect: false })} size="sm">
          Add an option
        </Button>
        {errors.options && <p className="text-red-500">{errors.options.message}</p>}
      </div>

      <Button type="submit" disabled={isPending} color="primary">
        {isPending ? "Saving..." : "Add a question to the test"}
      </Button>
    </form>
  );
}
