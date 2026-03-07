import type { LoginUserDto } from "@/shared/api/api.types";
import type { LoginUser } from "./login.types";

export function transformLoginUserToLoginUserDto(loginUser: LoginUser): LoginUserDto {
  const { login, password } = loginUser;
  return { user: { login, password } };
}