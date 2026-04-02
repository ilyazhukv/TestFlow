import { Button } from "@heroui/button";
import { TrashBin } from "@gravity-ui/icons";
import { useNavigate } from "react-router-dom";

import { useDeleteTestMutation } from "./delete-test.mutation";

import { pathKeys } from "@/shared/router";

interface DeleteTestProps {
  slug: string;
}

export function DeleteTestButton({ slug }: DeleteTestProps) {
  const navigate = useNavigate();

  const { mutate, isPending } = useDeleteTestMutation({
    mutationKey: [slug],
    onSuccess: () => {
      navigate(pathKeys.home, { replace: true });
    },
  });

  const handleClick = () => {
    mutate(slug);
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
