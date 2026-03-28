import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Image,
  Chip,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { Play } from "@gravity-ui/icons";

import { ENV } from "@/shared/config/env";

interface PassingStepProps {
  question: any;
  currentStep: number;
  totalSteps: number;
  onNext: (selectedIds: string[]) => void;
}

export function PassingStep({
  currentStep,
  question,
  totalSteps,
  onNext,
}: PassingStepProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [question._id]);

  const handleNext = () => {
    onNext(selectedIds);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8">
      <Card className="max-w-[800px] w-full p-4 shadow-lg">
        <CardHeader className="flex flex-col gap-3 items-start">
          {question.image && (
            <div className="relative w-full h-[240px] overflow-hidden rounded-xl">
              <Image
                removeWrapper
                alt="Question image"
                className="z-0 w-full h-full object-cover"
                src={`${ENV.API_URL}${question.image}`}
              />
            </div>
          )}

          <div className="flex justify-between w-full items-center">
            <Chip color="primary" radius="sm" size="sm" variant="flat">
              Question {currentStep} of {totalSteps}
            </Chip>
            <Chip
              color={
                question.type === "several_answers" ? "secondary" : "default"
              }
              size="sm"
              variant="dot"
            >
              {question.type === "several_answers"
                ? "Multiple choice"
                : "Single choice"}
            </Chip>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">{question.text}</h2>
        </CardHeader>

        <Divider className="my-4" />

        <CardBody className="py-6 overflow-visible">
          {question.type === "several_answers" ? (
            <CheckboxGroup
              className="gap-3"
              value={selectedIds}
              onValueChange={setSelectedIds}
            >
              {question.options.map((option: any) => (
                <Checkbox
                  key={option._id}
                  classNames={{
                    base: "max-w-full w-full bg-default-100 hover:bg-default-200 m-0 p-4 rounded-lg transition-colors",
                  }}
                  value={option._id}
                >
                  {option.text}
                </Checkbox>
              ))}
            </CheckboxGroup>
          ) : (
            <RadioGroup
              className="gap-3"
              value={selectedIds[0] || ""}
              onValueChange={(val) => setSelectedIds([val])}
            >
              {question.options.map((option: any) => (
                <Radio
                  key={option._id}
                  classNames={{
                    base: "max-w-full w-full bg-default-100 hover:bg-default-200 m-0 p-4 rounded-lg transition-colors",
                  }}
                  value={option._id}
                >
                  {option.text}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </CardBody>

        <CardFooter className="flex gap-3 justify-end pt-2">
          <Button
            className="px-8 font-semibold shadow-md"
            color="primary"
            endContent={<Play fill="currentColor" />}
            isDisabled={selectedIds.length === 0}
            size="lg"
            onPress={handleNext}
          >
            {currentStep === totalSteps ? "Finish" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
