import { z } from "zod";

import { PrimaryLoaderArgsSchema } from "./filter-test.contract";

export type PrimaryLoaderArgs = z.infer<typeof PrimaryLoaderArgsSchema>;
