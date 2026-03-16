import { LoaderFunctionArgs } from "react-router-dom";

import { queryClient } from "@/shared/queryClient";
import { testsQueryOptions } from "@/entities/test/test.api";
import { FilterQuerySchema } from "@/entities/test/test.contracts";

export default async function testListPageLoader({
  request,
}: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const filterQuery = FilterQuerySchema.parse({
    page: url.searchParams.get("page") || "1",
    tag: url.searchParams.get("tag") || undefined,
    search: url.searchParams.get("search") || undefined,
  });

  await queryClient.ensureQueryData(testsQueryOptions(filterQuery));

  return { context: { filterQuery } };
}
