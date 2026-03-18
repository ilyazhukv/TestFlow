import { ReactNode } from "react";

import { CreateTestForm } from "@/features/test/create-test/create-test.ui";

export function CreateEditorPage() {
  return (
    <EditorPageWrapperr>
      <CreateTestForm />
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
