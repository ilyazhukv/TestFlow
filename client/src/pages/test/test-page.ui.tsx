import { useLoaderData } from "react-router-dom";

import { EditorLoaderArgs } from "./test-page.loader";

import { ListTest } from "@/features/test/list-test/list-test.ui";
import { TestPassing } from "@/features/test/passing-test/passing-test.ui";

export function ListTestPage() {
  return (
    <div className="animate-slide-up">
      <div className="text-center mb-10 mt-6">
        <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">
          Discover Quizzes
        </h1>
        <p className="text-default-500 max-w-md mx-auto">
          Explore quizzes created by the community
        </p>
      </div>
      <ListTest />
    </div>
  );
}

export function TestPage() {
  const { params } = useLoaderData() as EditorLoaderArgs;
  const { slug } = params;

  return <TestPassing slug={slug} />;
}