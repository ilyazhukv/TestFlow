export interface Answers {
  _id?: string;
  questionId: string;
  selectedOptionIndexes: [];
  isCorrect: boolean;
}

export interface Result {
  _id: string;
  userId: string;
  testId: string;
  answers: [Answers];
  score: number;
  maxScore: number;
  percentage: number;
  completedAt: string;
}
