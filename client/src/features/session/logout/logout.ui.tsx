import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";

import { useLogoutMutation } from "./logout.mutation";

import { pathKeys } from "@/shared/router";

interface LogoutButtonProps {
  onClick?: () => void;
}

export default function LogoutButton({ onClick }: LogoutButtonProps) {
  const navigate = useNavigate();

  const { mutate } = useLogoutMutation({
    onSuccess() {
      navigate(pathKeys.root);
    },
  });

  const handleClick = () => {
    mutate();
    if (onClick) onClick();
  };

  return (
    <Button
      as={NavLink}
      className="text-sm font-normal text-default-600 bg-default-100 w-full"
      type="button"
      variant="flat"
      onClick={handleClick}
    >
      Logout
    </Button>
  );
}
