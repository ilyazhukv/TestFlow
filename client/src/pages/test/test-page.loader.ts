import { LoaderFunctionArgs } from "react-router-dom";
import { z } from "zod";

import { queryClient } from "@/shared/queryClient";
import { testQueryOptions, testsQueryOptions } from "@/entities/test/test.api";
import { FilterQuerySchema } from "@/entities/test/test.contracts";

export async function testsPageLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const filterQuery = FilterQuerySchema.parse({
    page: url.searchParams.get("page") || "1",
    tag: url.searchParams.get("tag") || undefined,
    search: url.searchParams.get("search") || undefined,
  });

  await queryClient.ensureQueryData(testsQueryOptions(filterQuery));

  return { context: { filterQuery } };
}

export async function testPageLoader(args: LoaderFunctionArgs) {
  const parsedArgs = TestLoaderArgsSchema.parse(args);
  const { params } = parsedArgs;
  const { slug } = params;

  await queryClient.prefetchQuery(testQueryOptions(slug));

  return parsedArgs;
}

const TestLoaderArgsSchema = z.object({
  request: z.custom<Request>(),
  params: z.object({ slug: z.string() }),
  context: z.any(),
});

export type EditorLoaderArgs = z.infer<typeof TestLoaderArgsSchema>;
