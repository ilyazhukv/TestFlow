import { Button } from "@heroui/button";
import { TrashBin } from "@gravity-ui/icons";

import { useDeleteQuestionMutation } from "./delete-question.mutation";

export function DeleteQuestButton(props: { slug: string; questionId: string }) {
  const { slug, questionId } = props;

  const { mutate, isPending } = useDeleteQuestionMutation({
    mutationKey: [slug],
  });

  const handleClick = () => {
    mutate({ slug: slug, questionId: questionId });
  };

  return (
    <Button
      className="bg-danger-50"
      disabled={isPending}
      type="button"
      onClick={handleClick}
    >
      <TrashBin />
    </Button>
  );
}
