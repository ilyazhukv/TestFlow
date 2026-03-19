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

export const CreateTestDtoSchema = z.object({
  image: z.any().nullable(),
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
  isPublic: z.boolean(),
});

export const TestDtoSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  category: z
    .object({
      _id: z.string(),
      title: z.string(),
    })
    .nullable(),
  author: z.object({
    _id: z.string(),
    name: z.string(),
    avatar: z.string().nullable().optional(),
  }),
  isPublic: z.boolean(),
  createdAt: z.string(),
});

export const TestsDtoSchema = z.object({
  tests: z.array(TestDtoSchema),
  testsCount: z.number(),
});

export const FilterQueryDtoSchema = z.object({
  offset: z.number().min(0),
  limit: z.number().min(1),
  tag: z.string().optional(),
  author: z.string().optional(),
});

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());
