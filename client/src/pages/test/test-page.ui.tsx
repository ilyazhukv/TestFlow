import { ReactNode } from "react";
import { useLoaderData } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { EditorLoaderArgs } from "./test-page.loader";

import { ListTests } from "@/features/test/list-test/list-test.ui";
import { testQueryOptions } from "@/entities/test/test.api";

export function ListTestPage() {
  return(
    <TestPageWrapperr>
      <ListTests />
    </TestPageWrapperr>
  )
}

export default function TestPage() {
  const { params } = useLoaderData() as EditorLoaderArgs;
  const { slug } = params;

  const { data: test } = useSuspenseQuery(testQueryOptions(slug));

  return <div>{test.slug}</div>;
}

function TestPageWrapperr(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">{children}</div>
        </div>
      </div>
    </div>
  );
}