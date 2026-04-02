import { ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { EditorLoaderArgs } from "./test-page.loader";

import { ListTest } from "@/features/test/list-test/list-test.ui";
import { TestPassing } from "@/features/test/passing-test/passing-test.ui";

export function ListTestPage() {
  return (
    <TestPageWrapper>
      <ListTest />
    </TestPageWrapper>
  );
}

export function TestPage() {
  const { params } = useLoaderData() as EditorLoaderArgs;
  const { slug } = params;

  return (
    <TestPageWrapper>
      <TestPassing slug={slug} />
    </TestPageWrapper>
  );
}

function TestPageWrapper(props: { children: ReactNode }) {
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
