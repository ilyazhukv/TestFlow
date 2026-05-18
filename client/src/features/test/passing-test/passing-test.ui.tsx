import { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Helmet } from "react-helmet-async";
import { Button } from "@heroui/button";
import { Card, Chip, CardBody, CardFooter, Image } from "@heroui/react";
import { Clock, Play, Target, CircleCheck } from "@gravity-ui/icons";

import { PassingStep } from "./passing-step.ui";
import { useSaveResultMutation } from "./passing-test.mutation";
import { SaveResult } from "./passing-test.types";

import { testQueryOptions } from "@/entities/test/test.api";
import { Timer } from "@/shared/ui/timer/timer";

interface BaseTestPassingProps {
  slug: string;
}

export function TestPassing({ slug }: BaseTestPassingProps) {
  return (
    <ErrorBoundary fallback={"Something went wrong..."}>
      <BaseTestPassing slug={slug} />
    </ErrorBoundary>
  );
}

export function BaseTestPassing({ slug }: BaseTestPassingProps) {
  const { data: test } = useSuspenseQuery(testQueryOptions(slug));
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<SaveResult>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const {
    mutate: saveResults,
    data: result,
    isPending,
  } = useSaveResultMutation(slug);

  const handleNext = (selectedOptIds: string[]) => {
    const currentQuestionId = test.questions[step - 1]._id;
    const newAnswer = { questionId: currentQuestionId, selectedOptIds };
    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (step === test.questions.length) {
      saveResults(updatedAnswers);
    }
    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (test?.timeLimit && timeLeft === null && step === 1) {
      setTimeLeft(test.timeLimit * 60);
    }
  }, [test?.timeLimit, step, timeLeft]);

  useEffect(() => {
    if (timeLeft === null || step === 0 || step > test.questions.length) return;
    if (timeLeft <= 0) {
      handleNext([]);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, step, test.questions.length]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) window.location.reload();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>{test.title}</title>
        <meta content={test.description} name="description" />
      </Helmet>

      {/* Start screen */}
      {step === 0 && (
        <div className="min-h-[80vh] flex items-center justify-center py-8 px-4 animate-slide-up">
          <Card className="max-w-2xl w-full shadow-2xl border-none rounded-3xl overflow-hidden">
            <div className="relative w-full h-56">
              {test.image ? (
                <Image
                  removeWrapper
                  alt="Test cover"
                  className="z-0 w-full h-full object-cover"
                  src={test.image}
                />
              ) : (
                <div className="w-full h-full kahoot-gradient flex items-center justify-center">
                  <Play fill="currentColor" className="text-white/30 w-24 h-24" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-black text-white mb-1 drop-shadow-lg">
                  {test.title}
                </h1>
                {test.category && (
                  <Chip className="bg-white/90 text-purple-700 font-semibold text-xs" size="sm">
                    {test.category.title}
                  </Chip>
                )}
              </div>
            </div>

            <CardBody className="p-6">
              <p className="text-default-600 mb-6 leading-relaxed">
                {test.description || "Test your knowledge with this interactive quiz."}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-default-100 rounded-2xl p-4 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-default-500">Time</p>
                  <p className="font-bold">{test.timeLimit ? `${test.timeLimit} min` : "No limit"}</p>
                </div>
                <div className="bg-default-100 rounded-2xl p-4 text-center">
                  <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-default-500">Questions</p>
                  <p className="font-bold">{test.questions.length}</p>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-sm text-purple-700 dark:text-purple-300 mb-2">
                  Before you start:
                </h4>
                <ul className="text-xs space-y-1.5 text-purple-600 dark:text-purple-400">
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• Timer starts when you press "Start"</li>
                  <li>• Answers cannot be changed once submitted</li>
                </ul>
              </div>
            </CardBody>

            <CardFooter className="p-6 pt-0">
              <Button
                className="w-full font-bold text-lg py-6 shadow-xl hover:shadow-2xl"
                color="primary"
                endContent={<Play fill="currentColor" className="w-5 h-5" />}
                radius="full"
                size="lg"
                onPress={() => setStep(1)}
              >
                Start Quiz
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Questions */}
      {step > 0 && step <= test.questions.length && (
        <PassingStep
          currentStep={step}
          question={test.questions[step - 1]}
          timer={timeLeft !== null && <Timer seconds={timeLeft} />}
          totalSteps={test.questions.length}
          onNext={handleNext}
        />
      )}

      {/* Results */}
      {step > test.questions.length && (
        <div className="min-h-[80vh] flex items-center justify-center py-8 px-4 animate-scale-in">
          <Card className="max-w-md w-full shadow-2xl border-none rounded-3xl overflow-hidden">
            <div className="kahoot-gradient p-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleCheck fill="currentColor" className="text-white w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-white">Quiz Complete!</h2>
              <p className="text-white/70 text-sm mt-1">Here's how you did</p>
            </div>

            <CardBody className="p-8">
              {isPending ? (
                <div className="text-center py-8">
                  <p className="text-primary font-bold animate-pulse text-lg">
                    Calculating your score...
                  </p>
                </div>
              ) : result ? (
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-default-100" />
                    <div
                      className="absolute inset-0 rounded-full kahoot-gradient"
                      style={{
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((result.percent / 100) * 2 * Math.PI)}% ${50 - 50 * Math.cos((result.percent / 100) * 2 * Math.PI)}%, 50% 50%)`,
                      }}
                    />
                    <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                      <div>
                        <p className="text-4xl font-black text-primary">{result.percent}%</p>
                        <p className="text-xs text-default-500">Score</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-default-100 rounded-2xl p-4">
                      <p className="text-xs text-default-500">Correct</p>
                      <p className="text-2xl font-bold text-success">{result.score}</p>
                    </div>
                    <div className="bg-default-100 rounded-2xl p-4">
                      <p className="text-xs text-default-500">Total</p>
                      <p className="text-2xl font-bold">{result.maxScore}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardBody>

            <CardFooter className="px-8 pb-8 pt-0 flex gap-3 justify-center">
              <Button
                className="font-bold"
                variant="flat"
                onPress={() => (window.location.href = "/")}
              >
                Home
              </Button>
              <Button
                className="font-bold shadow-lg"
                color="primary"
                onPress={() => {
                  setStep(0);
                  setUserAnswers([]);
                }}
              >
                Try Again
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}