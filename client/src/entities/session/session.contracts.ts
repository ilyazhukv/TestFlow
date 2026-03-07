import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  avatar: z.string().nullable(),
  name: z.string(),
  email: z.string().email(),
  token: z.string(),
  role: z.string(),
  status: z.string(),
  createdAt: z.string(),
});
