import { AxiosRequestConfig } from "axios";

import {
  UserDtoSchema,
  LoginUserDtoSchema,
  RegisterUserDtoSchema,
  TestDtoSchema,
  TestsDtoSchema,
  CreateTestDtoSchema,
  UpdateTestDtoSchema,
  CategoriesDtoSchema,
  QuestionDtoSchema,
  CreateQuestionDtoSchema,
  SaveResultDtoSchema,
  ResultDtoSchema,
  ProfileDtoSchema,
} from "./api.contracts";
import { api } from "./api.instance";
import { responseContract } from "./api.lib";
import { LoginUserDto, RegisterUserDto, CreateTestDto, UpdateTestDto, SaveResultDto } from "./api.types";

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

export function getProfileByName(name: string, config?: AxiosRequestConfig) {
  return api.get(`/user/${name}`, config).then(responseContract(ProfileDtoSchema));
}

export function getTestBySlug(slug: string, config?: AxiosRequestConfig) {
  return api.get(`/test/${slug}`, config).then(responseContract(TestDtoSchema));
}

export function getAllTests(config?: AxiosRequestConfig) {
  return api.get("/test", config).then(responseContract(TestsDtoSchema));
}

export function getMyTest(slug: string, config?: AxiosRequestConfig) {
  return api.get(`/test/my/${slug}`, config).then(responseContract(TestDtoSchema));
}

export function createTest(createTestDto: FormData | CreateTestDto, config?: AxiosRequestConfig) {
  const data = createTestDto instanceof FormData ? createTestDto : CreateTestDtoSchema.parse(createTestDto);
  return api.post("/test/create", data, config).then(responseContract(TestDtoSchema));
}

export function updateTest(slug: string, updateTestDto: FormData | UpdateTestDto, config?: AxiosRequestConfig<UpdateTestDto>,) {
  const data = updateTestDto instanceof FormData ? updateTestDto : UpdateTestDtoSchema.parse(updateTestDto); 
  return api.put(`/test/${slug}`, data, config).then(responseContract(TestDtoSchema))
}

export function deleteTest(slug: string, config?: AxiosRequestConfig) {
  return api.delete(`/test/${slug}`, config);
}

export function createQuestion(slug: string, createQuestionDto: FormData | CreateTestDto, config?: AxiosRequestConfig) {
  const data = createQuestionDto instanceof FormData ? createQuestionDto : CreateQuestionDtoSchema.parse(createQuestionDto);
  return api.post(`/question/${slug}`, data, config).then(responseContract(QuestionDtoSchema));
}

export function deleteQuestion(slug: string, qid: string, config?: AxiosRequestConfig) {
  return api.delete(`/question/${slug}`, {...config, data: {questionId: qid}});
}

export function saveResult(slug: string, saveResultDto: SaveResultDto, config?: AxiosRequestConfig) {
  const data = SaveResultDtoSchema.parse(saveResultDto); 
  return api.post(`/result/${slug}/save`, data, config).then(responseContract(ResultDtoSchema)); 
}

export function calcResult(slug: string, saveResultDto: SaveResultDto, config?: AxiosRequestConfig) {
  const data = SaveResultDtoSchema.parse(saveResultDto); 
  return api.post(`/result/${slug}/calc`, data, config).then(responseContract(ResultDtoSchema)); 
}

export function getCategories(config?: AxiosRequestConfig) {
  return api.get("/category", config).then(responseContract(CategoriesDtoSchema));
}