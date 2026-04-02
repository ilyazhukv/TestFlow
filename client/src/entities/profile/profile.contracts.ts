import { z } from "zod";

import { objectId, ResultDtoSchema } from "@/shared/api/api.contracts";

export const ProfileSchema = z.object({
  _id: objectId,
  avatar: z.string().nullable(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  status: z.string(),
  createdAt: z.string(),
  results: z.array(ResultDtoSchema),
});
