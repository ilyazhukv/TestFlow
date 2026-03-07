import { useNavigate } from "react-router-dom";
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
      className="btn btn-outline-danger"
      type="button"
      onClick={handleClick}
      data-test="logout-button"
    >
      Logout
    </Button>
  );
}
