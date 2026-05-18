import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { ListTest } from "@/features/test/list-test/list-test.ui";
import { TestPassing } from "@/features/test/passing-test/passing-test.ui";

export function ListTestPage() {
  return (
    <>
      <Helmet>
        <title>Discover Quizzes | TestFlow</title>
        <meta property="og:title" content="Discover Quizzes | TestFlow" />
        <meta property="og:description" content="Explore and play interactive quizzes created by the community on TestFlow." />
        <meta property="og:type" content="website" />
      </Helmet>
      
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
    </>
  );
}

export function TestPage() {
  const loaderData = useLoaderData() as any; 
  const slug = loaderData?.params?.slug || "";
  const testData = loaderData?.test; 

  const testTitle = testData?.title ? `${testData.title} | TestFlow` : `Quiz: ${slug} | TestFlow`;
  const testDescription = testData?.description || "Take this interactive quiz on TestFlow and challenge your knowledge!";
  const testImage = testData?.coverUrl || testData?.imageUrl || "https://unsplash.com";

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://testflow.com{slug}`;

  return (
    <>
      <Helmet>
        <title>{testTitle}</title>
        <meta name="description" content={testDescription} />
        <meta property="og:title" content={testTitle} />
        <meta property="og:description" content={testDescription} />
        <meta property="og:image" content={testImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <TestPassing slug={slug} />
    </>
  );
}
