import { Card, CardBody, Image, Avatar, Chip } from "@heroui/react";
import { Link } from "react-router-dom";

import { Test } from "./test.types";

import { ENV } from "@/shared/config/env";

export function TestCard({ data }: { data: Test }) {
  return (
    <Card
      isPressable
      className="border-none bg-background/60 dark:bg-default-100/50 shadow-sm hover:shadow-lg transition-all overflow-hidden hover:scale-110 transition-transform"
    >
      <Link className="w-full" to={`/test/${data.slug}`}>
        <div className="relative w-full h-[180px] overflow-hidden">
          <Image
            removeWrapper
            alt={data.title}
            className="z-0 w-full h-full object-cover"
            src={`${ENV.API_URL}${data.image}`}
          />
        </div>
      </Link>

      <CardBody className="p-4 flex flex-col gap-3">
        <Link to={`/test/${data.slug}`}>
          <div className="flex justify-between items-start gap-2 w-[85%]">
            <h4 className="font-bold text-lg leading-tight line-clamp-1">
              {data.title}
            </h4>
          </div>

          <p className="text-default-500 text-small line-clamp-2 min-h-[40px]">
            {data.description}
          </p>

          {data.category && (
            <Chip
              className="absolute top-3 right-3 z-10 backdrop-blur-md border-white/20"
              size="sm"
              variant="flat"
            >
              {data.category.title}
            </Chip>
          )}
        </Link>

        <Link to={`/user/${data.author.name}`}>
          <div className="flex items-center gap-3 pt-2 border-t border-divider">
            <Avatar
              className="w-8 h-8 text-[10px]"
              color="primary"
              name={data.author.name}
              size="sm"
              src={data.author.avatar || undefined}
            />
            <div className="flex flex-col">
              <span className="text-tiny font-semibold leading-none">
                {data.author.name}
              </span>
              <span className="text-[10px] text-default-400">
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
}
