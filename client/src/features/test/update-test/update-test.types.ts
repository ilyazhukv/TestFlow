import { z } from "zod";

import { UpdateTestSchema } from "./update-test.contracts";

export type UpdateTest = z.infer<typeof UpdateTestSchema>;
