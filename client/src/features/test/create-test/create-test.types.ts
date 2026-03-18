import { z } from "zod";

import { CreateTestSchema } from "./create-test.contracts";

export type CreateTest = z.infer<typeof CreateTestSchema>;
