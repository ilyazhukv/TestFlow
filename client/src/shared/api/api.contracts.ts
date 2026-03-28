import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const UserDtoSchema = z.object({
  user: z.object({
    id: objectId,
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

export const UpdateTestDtoSchema = z.object({
  slug: z.string(),
  image: z.any().nullable(),
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
  isPublic: z.boolean(),
});

export const OptionDtoSchema = z.object({
  _id: objectId.optional(),
  text: z.string(),
  isCorrect: z.boolean().default(false),
});

export const QuestionDtoSchema = z.object({
  _id: objectId,
  testId: z.string(),
  text: z.string(),
  image: z.string().optional().nullable(),
  type: z.enum(["one_answer", "several_answers"]),
  options: z.array(OptionDtoSchema).min(2),
  score: z.number().optional(),
});

export const CreateQuestionDtoSchema = z.object({
  text: z.string().min(1),
  type: z.enum(["one_answer", "several_answers"]),
  optional: z.array(OptionDtoSchema).min(2),
  score: z.number().optional(),
  image: z.any().optional(),
});

export const CategoryDtoSchema = z.object({
  _id: objectId,
  title: z.string(),
});

export const CategoriesDtoSchema = z.array(CategoryDtoSchema);

export const TestDtoSchema = z.object({
  _id: objectId,
  slug: z.string(),
  image: z.string().nullable(),
  title: z.string(),
  description: z.string(),
  timeLimit: z.number(),
  category: CategoryDtoSchema.nullable(),
  author: z.object({
    _id: objectId,
    name: z.string(),
    avatar: z.string().nullable().optional(),
  }),
  questions: z.array(z.union([QuestionDtoSchema, z.string()])).default([]),
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

export const ResultDtoSchema = z.object({
  _id: objectId,
  userId: objectId.nullable(),
  testId: objectId,
  score: z.number(),
  maxScore: z.number(),
  percent: z.number(),
  completedAt: z.string(), 
});

export const UserAnswerDtoSchema = z.object({
  questionId: objectId,
  selectedOptIds: z.array(objectId),
});

export const SaveResultDtoSchema = z.object({
  answers: z.array(UserAnswerDtoSchema),
});

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());
