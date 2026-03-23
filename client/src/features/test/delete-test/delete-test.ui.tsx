import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import { useDeleteTestMutation } from "./delete-test.mutation";

import { pathKeys } from "@/shared/router";

export function DeleteTestButton(props: { slug: string }) {
  const { slug } = props;

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
      Delete Test
    </Button>
  );
}
