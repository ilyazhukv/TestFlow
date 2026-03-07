import type { UserDto } from "@/shared/api/api.types";

import { User } from "./session.types";

export function transformUserDtoToUser(userDto: UserDto): User {
  const { user } = userDto;
  return {
    id: user.id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    token: user.token,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}
