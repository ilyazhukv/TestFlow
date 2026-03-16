import { Card, Skeleton } from "@heroui/react";

export function TestListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {new Array(9).fill(0).map((_, idx) => (
        <Card key={idx} className="py-4 shadow-sm h-full" radius="lg">
          <div className="pb-0 pt-2 px-4 flex flex-col items-start gap-2">
            <Skeleton className="w-1/3 h-3 rounded-lg" />
            <Skeleton className="w-1/4 h-3 rounded-lg" />
            <Skeleton className="w-4/5 h-6 rounded-lg mt-1" />
          </div>
          <div className="overflow-visible py-2 px-4">
            <Skeleton
              className="w-full rounded-xl"
              style={{ height: "270px" }}
            />
            <div className="space-y-2 mt-3">
              <Skeleton className="w-full h-3 rounded-lg" />{" "}
              <Skeleton className="w-2/3 h-3 rounded-lg" />{" "}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
