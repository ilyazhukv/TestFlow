import { z } from "zod";

import {
  UserDtoSchema,
  LoginUserDtoSchema,
  RegisterUserDtoSchema,
  ProfileDtoSchema,
  CreateTestDtoSchema,
  UpdateTestDtoSchema,
  TestDtoSchema,
  TestsDtoSchema,
  FilterQueryDtoSchema,
  QuestionDtoSchema,
  CategoryDtoSchema,
  CategoriesDtoSchema,
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
  OptionDtoSchema,
  SaveResultDtoSchema,
  ResultDtoSchema,
} from "./api.contracts";

export type UserDto = z.infer<typeof UserDtoSchema>;
export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;

export type ProfileDto = z.infer<typeof ProfileDtoSchema>;

export type CreateTestDto = z.infer<typeof CreateTestDtoSchema>;
export type UpdateTestDto = z.infer<typeof UpdateTestDtoSchema>;

export type TestDto = z.infer<typeof TestDtoSchema>;
export type TestsDto = z.infer<typeof TestsDtoSchema>;
export type FilterQueryDto = z.infer<typeof FilterQueryDtoSchema>;

export type SaveResultDto = z.infer<typeof SaveResultDtoSchema>;

export type ResultDto = z.infer<typeof ResultDtoSchema>;

export type QuestionDto = z.infer<typeof QuestionDtoSchema>;
export type OptionDto = z.infer<typeof OptionDtoSchema>;

export type CategoryDto = z.infer<typeof CategoryDtoSchema>;
export type CategoriesDto = z.infer<typeof CategoriesDtoSchema>;

export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
