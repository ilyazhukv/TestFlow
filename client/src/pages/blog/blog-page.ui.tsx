import type { BlogPageData } from "./blog-page.loader";

import { useLoaderData } from "react-router-dom";

import { title } from "@/shared/ui/primitives";

export function BlogPage() {
  const data = useLoaderData() as BlogPageData;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>{data.title}</h1>
      </div>
    </section>
  );
}
