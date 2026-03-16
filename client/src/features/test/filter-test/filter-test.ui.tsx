import { useSelector } from "react-redux";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Tabs, Tab } from "@heroui/react";

import { PrimaryLoaderArgs } from "./filter-test.types";

import { selectSession } from "@/entities/session/session.model";

export function PrimaryFilter() {
  const session = useSelector(selectSession);

  const { context } = useLoaderData() as PrimaryLoaderArgs;
  const { filterQuery } = context;
  const { tag } = filterQuery;

  const [, setSearchParams] = useSearchParams();


  const handleTabChange = () => {
    setSearchParams(new URLSearchParams({ page: "1" }));
  };

  return (
    <Tabs
      classNames={{
        tabList: "gap-6 w-full relative rounded-none border-b border-divider",
        cursor: "w-full bg-[#21d375]",
        tab: "max-w-fit px-0 h-12",
        tabContent: "group-data-[selected=true]:text-[#21d375]",
      }}
      variant="underlined"
      onSelectionChange={handleTabChange}
    >
      <Tab key="global" title="Global Feed" />
      {session && <Tab key="user" title="Your Feed" />}
      {tag && <Tab key="tag" title={`#${tag}`} />}
    </Tabs>
  );
}
