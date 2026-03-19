import { AxiosRequestConfig } from "axios";

import {
  UserDtoSchema,
  LoginUserDtoSchema,
  RegisterUserDtoSchema,
  TestDtoSchema,
  TestsDtoSchema,
  CreateTestDtoSchema,
} from "./api.contracts";
import { api } from "./api.instance";
import { responseContract } from "./api.lib";
import { LoginUserDto, RegisterUserDto, CreateTestDto } from "./api.types";

export function getUser(config?: AxiosRequestConfig) {
  return api.get('/user', config).then(responseContract(UserDtoSchema));
}

export function loginUser(loginUserDto: LoginUserDto, config?: AxiosRequestConfig<LoginUserDto>) {
  const data = LoginUserDtoSchema.parse(loginUserDto);
  return api.post("/auth/login", data, config).then(responseContract(UserDtoSchema));
}

export function registerUser(registerUserDto: RegisterUserDto, config?: AxiosRequestConfig<RegisterUserDto>) {
  const data = RegisterUserDtoSchema.parse(registerUserDto);
  return api.post("/auth/register", data, config).then(responseContract(UserDtoSchema));
}

export function logoutUser(config?: AxiosRequestConfig) {
  return api.post("/auth/logout", {}, config)
}

export function refreshToken(config?: AxiosRequestConfig) {
  return api.get("/auth/refresh", config).then(responseContract(UserDtoSchema));
}

export function getTestBySlug(slug: string, config?: AxiosRequestConfig) {
  return api.get(`/test/${slug}`, config).then(responseContract(TestDtoSchema));
}

export function getAllTests(config?: AxiosRequestConfig) {
  return api.get("/test", config).then(responseContract(TestsDtoSchema));
}

export function createTest(createTestDto: FormData | CreateTestDto, config?: AxiosRequestConfig) {
  const data = createTestDto instanceof FormData ? createTestDto : CreateTestDtoSchema.parse(createTestDto);
  return api.post("/test/create", data, config).then(responseContract(TestDtoSchema));
}
