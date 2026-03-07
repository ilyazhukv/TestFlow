import { z } from "zod";

export const LoginUserSchema = z.object({
  login: z.string(),
  password: z.string().min(8, {
    message:
      "Your password must be at least 8 characters long. Please try again.",
  }),
});
