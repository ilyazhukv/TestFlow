import { z } from "zod";

import { PrimaryLoaderArgsSchema } from "./filter-test.contracts";

export type PrimaryLoaderArgs = z.infer<typeof PrimaryLoaderArgsSchema>;
