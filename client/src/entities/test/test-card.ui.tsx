import { Card, CardBody, Image, Chip, Avatar } from "@heroui/react";
import { Link } from "react-router-dom";
import { Play } from "@gravity-ui/icons";

import { Test } from "./test.types";

export function TestCard({ data }: { data: Test }) {
  return (
    <Card
      isPressable
      className="border-none bg-background/80 dark:bg-default-100/50 shadow-sm hover:shadow-xl kahoot-card-hover overflow-hidden group rounded-2xl"
    >
      <Link className="w-full" to={`/test/${data.slug}`}>
        <div className="relative w-full h-[180px] overflow-hidden">
          {data.image ? (
            <Image
              removeWrapper
              alt={data.title}
              className="z-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={data.image}
            />
          ) : (
            <div className="w-full h-full kahoot-gradient flex items-center justify-center">
              <Play fill="currentColor" className="text-white/40 w-16 h-16" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {data.category && (
            <Chip
              className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-md text-purple-700 font-semibold text-[10px]"
              size="sm"
              variant="flat"
            >
              {data.category.title}
            </Chip>
          )}

          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between">
            <h4 className="font-bold text-sm text-white leading-tight line-clamp-2 drop-shadow-lg">
              {data.title}
            </h4>
          </div>
        </div>
      </Link>

      <CardBody className="p-3">
        <p className="text-tiny text-default-500 line-clamp-2 mb-3 leading-relaxed">
          {data.description || "No description provided"}
        </p>

        <Link to={`/user/${data.author.name}`}>
          <div className="flex items-center gap-2 pt-2 border-t border-divider">
            <Avatar
              className="w-6 h-6 text-[8px]"
              color="primary"
              name={data.author.name}
              size="sm"
              src={data.author.avatar || undefined}
            />
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold leading-none">
                {data.author.name}
              </span>
              <span className="text-[8px] text-default-400">
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
}