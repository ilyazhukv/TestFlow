import { useSearchParams, useLoaderData } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Pagination } from "@heroui/react";

import { testsQueryOptions } from "@/entities/test/test.api";
import { TestCard } from "@/entities/test/test-card.ui";

export default function BaseTestListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { context } = useLoaderData() as any;
  const { filterQuery } = context;

  const { data } = useSuspenseQuery(testsQueryOptions(filterQuery));

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("page", String(page));
    setSearchParams(newParams);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.tests.map((test: any) => (
          <TestCard key={test.id} data={test} />
        ))}
      </div>

      {data.testsCount > 9 && (
        <div className="flex justify-center mt-12">
          <Pagination
            color="primary"
            page={Number(filterQuery.page)}
            total={Math.ceil(data.testsCount / 9)}
            variant="flat"
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
