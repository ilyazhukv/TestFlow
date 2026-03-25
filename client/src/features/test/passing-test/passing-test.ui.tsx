import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import { Button } from "@heroui/button";
import {
  Card,
  CardHeader,
  Chip,
  Divider,
  CardBody,
  CardFooter,
  Image,
} from "@heroui/react";
import { Clock, ChevronLeft, Play } from "@gravity-ui/icons";

import { testQueryOptions } from "@/entities/test/test.api";
import { ENV } from "@/shared/config/env";

interface BaseTestPassingProps {
  slug: string;
}

export function TestPassing({ slug }: BaseTestPassingProps) {
  return (
    <ErrorBoundary fallback={"Somthing went wrong..."}>
      <BaseTestPassing slug={slug} />
    </ErrorBoundary>
  );
}

export function BaseTestPassing({ slug }: BaseTestPassingProps) {
  const { data: test } = useSuspenseQuery(testQueryOptions(slug));

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{test.title}</title>
        <meta content={test.description} name="description" />
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
        <Card className="max-w-[800px] w-full p-4 shadow-lg">
          <CardHeader className="flex flex-col gap-3 items-start">
            <div className="relative w-full h-[240px] overflow-hidden">
              <Image
                removeWrapper
                alt="Test cover"
                className="z-0 w-full h-full object-cover"
                src={`${ENV.API_URL}${test.image}`}
              />
            </div>
            <div className="flex justify-between w-full items-center">
              <Chip color="primary" radius="sm" size="sm" variant="flat">
                {test.category?.title || "All Tests"}
              </Chip>
              <div className="flex gap-2">
                <Chip size="sm" startContent={<Clock />} variant="light">
                  {test.timeLimit ? `${test.timeLimit} min` : "No limit"}
                </Chip>
                <Chip size="sm" variant="light">
                  {test.questions.length || 0}{" "}
                  {test.questions.length > 1 ? "questions" : "question"}
                </Chip>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{test.title}</h1>
            <p className="text-default-500 text-lg leading-relaxed">
              {test.description ||
                "Find out your level of knowledge by answering the questions of this test."}
            </p>
          </CardHeader>

          <Divider className="my-4" />

          <CardBody className="py-6">
            <div className="bg-default-100 p-4 rounded-xl">
              <h4 className="font-semibold mb-2 text-sm uppercase text-default-600">
                Before you start:
              </h4>
              <ul className="text-sm text-default-500 space-y-2">
                <li>• Make sure you have a stable internet connection.</li>
                <li>
                  • After pressing the button, the time will start counting down
                  (if there is one).
                </li>
                <li>
                  • You won&apos;t be able to change your answer once you move
                  on to the next question.
                </li>
              </ul>
            </div>
          </CardBody>

          <CardFooter className="flex gap-3 justify-end pt-2">
            <Button
              startContent={<ChevronLeft />}
              variant="light"
              onPress={() => window.history.back()}
            >
              Back
            </Button>
            <Button
              className="px-8 font-semibold shadow-md"
              color="primary"
              endContent={<Play fill="currentColor" />}
              size="lg"
              onPress={() => console.log("Start test!")}
            >
              Start test
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
