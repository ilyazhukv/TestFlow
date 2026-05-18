import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
} from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

interface Options {
  _id?: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  testId: string;
  text: string;
  image?: string | null;
  type: string;
  options: Array<Options>;
  score?: number;
}

interface PassingStepProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onNext: (selectedIds: string[]) => void;
  timer?: React.ReactNode;
}

const answerColors = [
  { bg: "bg-red-500 hover:bg-red-600 active:bg-red-700", selected: "ring-red-500" },
  { bg: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700", selected: "ring-blue-500" },
  { bg: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700", selected: "ring-yellow-500" },
  { bg: "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700", selected: "ring-emerald-500" },
];

export function PassingStep({
  currentStep,
  question,
  totalSteps,
  onNext,
  timer,
}: PassingStepProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [question._id]);

  const handleSelect = (id: string) => {
    if (question.type === "several_answers") {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setSelectedIds([id]);
    }
  };

  const handleNext = () => {
    onNext(selectedIds);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-8 px-4 animate-slide-up">
      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-2 bg-default-200 rounded-full overflow-hidden">
            <div
              className="h-full kahoot-gradient rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <Chip
            className="font-bold"
            color="primary"
            size="sm"
            variant="flat"
          >
            {currentStep} / {totalSteps}
          </Chip>
        </div>
        {timer && <div className="flex justify-center mt-2">{timer}</div>}
      </div>

      {/* Question card */}
      <Card className="w-full max-w-2xl shadow-2xl border-none rounded-3xl overflow-hidden">
        {question.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              removeWrapper
              alt="Question image"
              className="z-0 w-full h-full object-cover"
              src={question.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        <CardHeader className={`flex flex-col gap-2 px-6 pt-6 pb-4 ${!question.image ? '' : ''}`}>
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
            {question.text}
          </h2>
          <p className="text-xs text-default-400">
            {question.type === "several_answers"
              ? "Select all that apply"
              : "Choose the correct answer"}
          </p>
        </CardHeader>

        <CardBody className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option, index) => {
              const colors = answerColors[index % answerColors.length];
              const isSelected = selectedIds.includes(option._id!);

              return (
                <Button
                  key={option._id}
                  className={`
                    h-auto min-h-[72px] p-4 rounded-2xl border-2 transition-all duration-200
                    ${isSelected
                      ? `${colors.bg} text-white border-transparent shadow-lg scale-[1.02]`
                      : "bg-default-100 hover:bg-default-200 border-transparent text-foreground"
                    }
                  `}
                  onPress={() => handleSelect(option._id!)}
                  startContent={
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                        ${isSelected
                          ? "bg-white/20 text-white"
                          : "bg-default-200 text-default-500"
                        }
                      `}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                  }
                >
                  <span className={`text-left font-semibold ${isSelected ? "text-white" : ""}`}>
                    {option.text}
                  </span>
                </Button>
              );
            })}
          </div>
        </CardBody>

        <CardFooter className="px-6 pb-6 pt-0">
          <Button
            className="w-full font-bold shadow-lg"
            color={selectedIds.length > 0 ? "primary" : "default"}
            endContent={<ArrowRight fill="currentColor" className="w-5 h-5" />}
            isDisabled={selectedIds.length === 0}
            size="lg"
            onPress={handleNext}
          >
            {currentStep === totalSteps ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}