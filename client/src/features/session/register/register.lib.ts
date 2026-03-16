import type { RegisterUserDto } from "@/shared/api/api.types";
import type { RegisterUser } from "./register.types";

export function transformRegisterUserToRegisterUserDto(
  registerUser: RegisterUser,
): RegisterUserDto {
  const { name, email, password } = registerUser;
  return { user: { name, email, password } };
}
