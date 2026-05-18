import { useLoaderData } from "react-router-dom";

import { EditorLoaderArgs } from "./editor-page.loader";

import { CreateTestForm } from "@/features/test/create-test/create-test.ui";
import { UpdateTestForm } from "@/features/test/update-test/update-test.ui";

export function CreateEditorPage() {
  return (
    <div className="animate-slide-up">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
            Create Quiz
          </h1>
          <p className="text-default-500 max-w-md mx-auto">
            Build your own interactive quiz in minutes
          </p>
        </div>
        <CreateTestForm />
      </div>
    </div>
  );
}

export function UpdateEditorPage() {
  const { params } = useLoaderData() as EditorLoaderArgs;
  const { slug } = params;

  return (
    <div className="animate-slide-up">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
            Edit Quiz
          </h1>
          <p className="text-default-500 max-w-md mx-auto">
            Make changes to your quiz
          </p>
        </div>
        <UpdateTestForm slug={slug} />
      </div>
    </div>
  );
}