import { z } from "zod";

export const UserDtoSchema = z.object({
  user: z.object({
    id: z.string(),
    avatar: z.string().nullable(),
    name: z.string(),
    email: z.string().email(),
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

export const TestDtoSchema = z.object({
  test: z.object({
    id: z.string(),
    image: z.string().nullable(),
    title: z.string(),
    description: z.string(),
    category: z.optional(z.string().array()),
    author: z.object({
      avatar: z.string().nullable(),
      name: z.string(),
    }),
    isPublic: z.boolean(),
    createdAt: z.string(),
  }),
});

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());
