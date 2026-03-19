import { z } from "zod";

import {
  UserDtoSchema,
  LoginUserDtoSchema,
  RegisterUserDtoSchema,
  CreateTestDtoSchema,
  TestDtoSchema,
  TestsDtoSchema,
  FilterQueryDtoSchema,
  CategoryDtoSchema,
  CategoriesDtoSchema,
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
} from "./api.contracts";

export type UserDto = z.infer<typeof UserDtoSchema>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;

export type CreateTestDto = z.infer<typeof CreateTestDtoSchema>;
export type TestDto = z.infer<typeof TestDtoSchema>;
export type TestsDto = z.infer<typeof TestsDtoSchema>;
export type FilterQueryDto = z.infer<typeof FilterQueryDtoSchema>;

export type CategoryDto = z.infer<typeof CategoryDtoSchema>;
export type CategoriesDto = z.infer<typeof CategoriesDtoSchema>;

export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
