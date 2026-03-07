import { z } from "zod";

export const UserDtoSchema = z.object({
  user: z.object({
    id: z.string(),
    avatar: z.string().nullable(),
    name: z.string(),
    email: z.string().email(),
    token: z.string(),
    role: z.string(),
    status: z.string(),
    createdAt: z.string(),
  }),
});

export const LoginUserDtoSchema = z.object({
  user: z.object({
    login: z.string(),
    password: z.string(),
  }),
});

export const RegisterUserDtoSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());
