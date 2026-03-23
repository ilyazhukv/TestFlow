import { Card, CardBody, CardHeader } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";

import { Question } from "./question.types";

interface Props {
  question: Question;
  index: number;
  actionButtons?: React.ReactNode;
}

export function QuestionCard({ question, index, actionButtons }: Props) {
  return (
    <Card className="mb-4 shadow-sm border-1 border-default-200">
      <CardHeader className="flex flex-col gap-3 px-4 pt-4 pb-2">
        <div className="flex justify-between items-start w-full gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-lg leading-tight">
              <span className="text-primary mr-2">{index + 1}.</span>
              {question.text}
            </h4>
            <Chip className="mt-1" color="secondary" size="sm" variant="flat">
              {question.score} points
            </Chip>
          </div>
          <div className="flex-shrink-0">{actionButtons}</div>
        </div>

        {question.image && (
          <div className="w-full overflow-hidden rounded-xl border-1 border-default-100">
            <Image
              alt="Question illustration"
              className="object-cover w-full max-h-[300px]"
              src={`${import.meta.env.VITE_API_URL}${question.image}`}
              width="100%"
            />
          </div>
        )}
      </CardHeader>

      <CardBody className="px-4 pb-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {question.options.map((option) => (
            <div
              key={option._id}
              className={`
                flex items-center gap-3 p-3 rounded-xl border-1 transition-colors
                ${
                  option.isCorrect
                    ? "bg-success-50 border-success-200 text-success-700"
                    : "bg-default-50 border-default-100 text-default-600"
                }
              `}
            >
              <div
                className={`
                w-2 h-2 rounded-full flex-shrink-0
                ${option.isCorrect ? "bg-success animate-pulse" : "bg-default-300"}
              `}
              />
              <span className="text-sm font-medium leading-snug">
                {option.text}
              </span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
