import { Question } from "./question.types";

interface Props {
  question: Question;
  index: number;
  actionButtons?: React.ReactNode;
}

export function QuestionCard({ question, index, actionButtons }: Props) {
  return (
    <div className="p-4 border rounded-lg mb-4 shadow-sm">
      <div className="flex justify-between items-start">
        <h4 className="font-bold">
          {index + 1}. {question.text}
          <span className="ml-2 text-sm text-gray-500">
            ({question.score} score)
          </span>
        </h4>
        {actionButtons}
      </div>

      <ul className="mt-2 space-y-1">
        {question.options.map((option) => (
          <li
            key={option._id}
            className={`text-sm p-2 rounded ${option.isCorrect ? "green" : "balck"}`}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
