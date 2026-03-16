import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import { useLogoutMutation } from "./logout.mutation";

import { pathKeys } from "@/shared/router";

export default function LogoutButton() {
  const navigate = useNavigate();

  const { mutate } = useLogoutMutation({
    onSuccess() {
      navigate(pathKeys.root);
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <Button
      as={NavLink}
      className="text-sm font-normal text-default-600 bg-default-100"
      type="button"
      onClick={handleClick}
      variant="flat"
    >
      Logout
    </Button>
  );
}