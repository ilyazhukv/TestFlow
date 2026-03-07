import { z } from "zod";

import {
  UserDtoSchema,
  LoginUserDtoSchema,
  RegisterUserDtoSchema,
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
} from "./api.contracts";

export type UserDto = z.infer<typeof UserDtoSchema>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;

export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
