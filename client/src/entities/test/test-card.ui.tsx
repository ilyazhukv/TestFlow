import { Card, CardHeader, CardBody, Image, Avatar } from "@heroui/react";
import { Link } from "react-router-dom";

import { Test } from "./test.types";

import { ENV } from "@/shared/config/env";

export function TestCard({ data }: { data: Test }) {
  return (
    <Card className="py-4 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-0 pt-2 px-4 flex-row items-center gap-3">
        <Avatar
          name={data.author.name}
          size="sm"
          src={data.author.avatar || undefined}
        />
        <div className="flex flex-col">
          <p className="text-small font-bold">{data.author.name}</p>
          <p className="text-tiny text-default-500">
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 space-y-3">
        <Link to={`/test/${data.slug}`}>
          <h4 className="font-bold text-large px-2">{data.title}</h4>
          <Image
            alt={data.title}
            className="object-cover rounded-xl"
            height={180}
            src={`${ENV.API_URL}${data.image}`}
            width="100%"
          />
          <p className="text-default-500 text-small px-2 line-clamp-2">
            {data.description}
          </p>
        </Link>
        {data.category && (
          <span className="inline-block bg-primary-100 text-primary-700 text-tiny px-2 py-1 rounded-full w-fit ml-2">
            {data.category.title}
          </span>
        )}
      </CardBody>
    </Card>
  );
}
