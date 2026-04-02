import { ReactNode } from "react";
import { useLoaderData } from "react-router-dom";

import { EditorLoaderArgs } from "./editor-page.loader";

import { CreateTestForm } from "@/features/test/create-test/create-test.ui";
import { UpdateTestForm } from "@/features/test/update-test/update-test.ui";

export function CreateEditorPage() {
  return (
    <EditorPageWrapperr>
      <CreateTestForm />
    </EditorPageWrapperr>
  );
}

export function UpdateEditorPage() {
  const { params } = useLoaderData() as EditorLoaderArgs;
  const { slug } = params;

  return (
    <EditorPageWrapperr>
      <UpdateTestForm slug={slug} />
    </EditorPageWrapperr>
  );
}

function EditorPageWrapperr(props: { children: ReactNode }) {
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
